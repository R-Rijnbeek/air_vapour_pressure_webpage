# =============== IMPORTS ==============

from flask import Blueprint

# =============== DEFINE BLUEPRINTS ==============

tab1 = Blueprint('tab1', __name__, template_folder = 'templates')

tab2 = Blueprint('tab2', __name__, template_folder = 'templates')

tab3 = Blueprint('tab3', __name__, template_folder = 'templates')

from . import routes
