# =============== IMPORTS ==============

from flask import Blueprint

# =============== DEFINE BLUEPRINTS ==============

test = Blueprint('test', __name__, template_folder = 'templates')

api = Blueprint('api', __name__)

from . import routes