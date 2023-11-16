from flask import Flask

from app.shared import LOG


def create_app():
    app = Flask(__name__)

    app.config.from_pyfile("dev_config.cfg")
    
    LOG.init_app(app)

    from .public import test, api
    app.register_blueprint(test)
    app.register_blueprint(api)

    return app