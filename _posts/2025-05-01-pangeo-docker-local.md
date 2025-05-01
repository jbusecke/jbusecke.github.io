---
layout: post
author: Julius Busecke
title: "Reproducing Science Locally"
subtitle: "Running Pangeo Docker images on your Mac"
---

I recently [quit my job](https://jbusecke.github.io/2025/02/15/burnout/) and took an extended break, which was, in itself, glorious. It's not that I generally feel glorious overall right now, as America is not just flirting but getting to second base with a fascist dictatorship and tearing down scientific achievements of the last centuries within months. But let's leave that for another post ...

One of the things I've been doing recently is finishing up some of the work in publications I'm involved in. I prototyped a way to [extract citation information from metadata](https://github.com/jbusecke/xMIP/issues/379) and this week I am addressing reviewer questions for a paper that is very near and dear to my heart ([preprint](https://eartharxiv.org/repository/view/7144/)). Part of the work in this paper involved creating a [python/xarray wrapper for a FORTRAN library called aerobulk](https://github.com/xgcm/aerobulk-python) which enables you to run the exact algorithms used in numerical simulations to determine the turbulent fluxes between the ocean and atmosphere. This worked well once we had all the dependencies in place, but we found several times that conflicts arose when the base image was updated, so a fully frozen/locked software environment seemed (and generally is) like the right choice to make our results actually reproducible on any platform.  We therefore ['layered' our package](https://github.com/ocean-transport/scale-aware-air-sea/blob/main/Dockerfile) on top of an existing [Pangeo docker image](https://github.com/pangeo-data/pangeo-docker-images) (the default environment on the hub) following the [2i2c docs](https://docs.2i2c.org/admin/howto/environment/update-community-image/). 

I did all of the very intense computation and the final plotting on the [LEAP Jupyter Hub](https://leap.columbia.edu/leap-pangeo-3/leap-pangeo-sub/) (provided by [2i2c](https://2i2c.org/)), but I no longer have access to it. Since spinning up a server via the hub was always super easy I never bothered to try out to run the docker images locally until now! I did not actually find any documentation on this, but there were very helpful discussions on the [2i2c infrastructure repo](https://github.com/2i2c-org/infrastructure/issues/1705) . So I figured I'd document this for myself and anyone who might be in a similar situation.

## What you need

- A local docker installation ( I used [Docker Desktop for Mac](https://docs.docker.com/desktop/setup/install/mac-install/))
- The docker registry URL (or endpoint). This will look something like `myregistry.example.com/myuser/myimage:tag` in my example I will use `quay.io/jbusecke/scale-aware-air-sea:68b654d76dce`

## Run the image 

The base command will be structured like this (replace all the `'<...>'` with values of your choice):

```shell
docker run -p <your_port>:<your_port> -v <path/to/your/notebook/repo>:/home/jovyan/repo -it --name <your_name|optional> myregistry.example.com/myuser/myimage:tag jupyter lab --ip=0.0.0.0 --port=<your_port>
```
You'll have to wait for the image to be pulled (if this is the first time running it) and eventually you will get output that looks like this

```
yada, yada, yada,
...
http://127.0.0.1:9000/?token=a13704b36331f073c869941e82104b0cd92c23f0bc41926d
```

That last URL is what you need to copy to your browser to find the same interface as on the hub. Amazing 🤩. 

In my case, I had to add some more details (which I will explain below), so my command ended up looking like this:

```shell
docker run -p 9000:9000 -p 8787:8787 -v ~/Code/scale-aware-air-sea/:/home/jovyan/repo -v ~/.aws:/home/jovyan/.aws --name scale -it quay.io/jbusecke/scale-aware-air-sea:68b654d76dce jupyter lab --ip=0.0.0.0 --port=9000
```

Ok so lets break it down: 

- I chose to use `9000` as the port on which the jupyter lab is running. You can replace this with any value you like but make sure that it is the same value in all 3 locations. 
- I also added `-p 8787:8787` to be able to use the [Dask Dashboard](https://docs.dask.org/en/latest/dashboard.html). `8787` is the default port, you could change this, but I did not bother here.
- In addition to mounting my code directory in the container, I also needed to add some secrets to access the [OSN Cloud Storage](https://www.openstoragenetwork.org/) (provided by [m2lines](https://m2lines.github.io/) 🙏). When I tried to mount the file itself I ended up with a permission error, but apparently on Mac this can be prevented by mounting the entire directory 🤷‍♂️. Mounting the secrets into the container avoids having to hardcode them into the container image (**NOT SAFE**) or having to rewrite them manually each time (** HELLA ANNOYING**). 
- I ended up having to recreate the same container a bunch of times to fiddle with the command, if you find yourself in that situation, do youself a favor and add `docker rm scale; docker run ...` to remove the container and rebuild it in one go.

## Some Notes on Docker Configuration specific to Apple Silicon

The pangeo docker images are not running natively on Apples chips, so they have to get emulated. Explaining this is honestly a bit beyond me at this point, but practically I found that chosing `Apple Virtualization Framework` and enabling `Use Rosetta for x86_64/amd64 emulation on Apple Silicon` in the `Docker Desktop> Settings>General>Virtual Machine Options` worked the fastest. I did not extensively test this, but that might be a fun thing for another time. 

One last comment regarding Dask workers. Depending on your workflow you might want to replicate the memory to vCPU/thread ratio from another deployment to avoid running into memory issues (either by restricting the resources available in `Docker Desktop>Settings>Resources` or by explicitly specifying the worker resources in dask, but this really depends on the specific code you are running. 
