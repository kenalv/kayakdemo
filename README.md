# kayakdemo
Intern test, make kayak website demo, (cheapest flight search).
___
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
___
### Prerequisites

First we need to install the required software to set up the proyects.

* Anaconda 2018.12 [(Python 3.7 Distribution or the lastest)](https://www.anaconda.com/distribution/)
* Django v2.1.7 [Anaconda Django Package](https://anaconda.org/anaconda/django)
* Django Rest Framework 3.9.2 [Anaconda Django Rest Framework](https://anaconda.org/conda-forge/djangorestframework)

* Angular 7 **Node.js required** [Angular guide](https://angular.io/guide/quickstart)
___
### Installing

#### Back-end Installation ####

* Anaconda **set-up**:
    After conda got installed, use the terminal or an Anaconda Prompt for the following steps:

    1. Create Environment:
        ``` conda create --name myenviromentname  ```

        > You must change you must change **(myenviromentname)** with your own environment **name**
         
        NOTES:
        > To create an environment with a specific Python Version: 

        ``` conda create -n myenviromentname python=3.7  ```
  
    2. When conda asks you to proceed, type:   `y`
        > **proceed([y]/n)?**
    
    NOTES:
    > To create an environment with a specific package:  

    ``` conda install -n myenviromentname django ```
    > To create an environment with a  specific Python version and multiple packages:  

    ``` conda create -n myenv python=3.7 django=2.1.7 astroid babel ```

    3. Installing Anaconda packages:

    ``` conda install -c anaconda mypackagename ```
    
* Django **set-up**:

    **Django DOCUMENTATION** [Django.docs](http://www.djangoproject.com/)

    1. Install Django from anaconda packages:
        ``` conda install -c anaconda django ``` or  ``` conda install -c anaconda django=2.1.7 ``` for 2.1.7 django version.

* Django Rest Framework **set-up**:

    1. Install rest framework from anaconda packages:
        ``` conda install -c conda-forge djangorestframework ``` or  ``` conda install -c conda-forge djangorestframework=3.9.2 ``` for 3.9.2 rest framework version.


#### Front-end Installation ####

* Node.js **set-up**:
    Angular requires Node.js version 8.x or 10.x.

    1. To check your version, run node -v in a terminal/console window.

    2. If you dont have Node.js installed go to [Node website](https://nodejs.org/en/)

* Angular **set-up**:
    Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as **npm packages**. To download and install npm packages, you must have an npm package manager. 

    1. Install the Angular CLI, open a terminal/console window and enter the following command:
        ``` npm install -g @angular/cli ```

    2. Open project's  frontend/kayakdemo folder and run the following command:
        ``` npm install ```

        NOTE:
        > This command will install all the node packages used on the app. 
        You may wait few mins to finish packages installation.

    3. Serve the application.
        On frontend/kayakdemo folder, open terminal/console and run  the following command:
        ``` ng serve --open ```

        NOTE:
        >The --open (or just -o) option automatically opens your browser to http://localhost:4200/.



## Running the tests

This project dont contain any test. 
This section may be filled in a future.


## Authors

* **Kenneth Alvarez** - *Few Works* - [Kenalv](https://github.com/kenalv)

## Acknowledgments

* Kayak cheapest flight search [visit](https://www.es.kayak.com)
