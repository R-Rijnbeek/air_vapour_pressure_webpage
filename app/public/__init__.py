from flask import Blueprint

test = Blueprint('test', __name__, template_folder = 'templates')

api = Blueprint('api', __name__)

from . import routes