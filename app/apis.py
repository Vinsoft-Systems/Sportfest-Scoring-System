from fastapi_rtk.api import ModelRestApi, SQLAInterface

from .app import toolkit
from .models import *


class ExampleApi(ModelRestApi):
    resource_name = "examples"
    datamodel = SQLAInterface(Example)


toolkit.add_api(ExampleApi)
