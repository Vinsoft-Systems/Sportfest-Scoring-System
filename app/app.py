import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_rtk import FastAPIReactToolkit

from app import config

logging.basicConfig(format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
logging.getLogger().setLevel(logging.INFO)


async def on_startup(app: FastAPI):
    # Do something here before the app starts
    pass


app = FastAPI(docs_url="/openapi/v1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

toolkit = FastAPIReactToolkit(create_tables=True, on_startup=on_startup)
toolkit.config.from_object(config)
toolkit.config.from_envvar("SKELETON_CONFIG", silent=True)
toolkit.config.from_pyfile("dev_config.py", silent=True)
toolkit.initialize(app)

from .apis import *
