#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
__init__.py: This module define the webservice function build with Flask
"""
# =============== IMPORTS ==============

from flask import Flask

from app.shared import LOG

# =============== PROCESS ===============

def create_app():
    """
    INFORMATION: Fuction that activate the webservice with the selected configuration values of url, Port and debug mode defined in "dev_config.cfg"

    INPUT: None

    OUTPUT:BOOLEAN
    """
    try:
        APP = Flask(__name__)

        APP.config.from_pyfile("dev_config.cfg")

        APP.json.sort_keys = False # Preserve the order of the JSON dict, cnt put it on the dev_config.cfg because sinse Flask version  2.3.x changes remove it as standard configutaion
        
        LOG.init_app(APP)

        LOG.info("Register Blueprints")
        from .public import tab1, tab2, tab3
        APP.register_blueprint(tab1)
        APP.register_blueprint(tab2)
        APP.register_blueprint(tab3)

        LOG.info("Run the WebService")
        return APP
    
    except Exception as exc:
        message = f"unexpected error activting the webservice process: {exc}"
        if (LOG.isLoggerActive()):
            LOG.critical(message)
        else:
            print(f"CRITICAL: {message}")
        return False
