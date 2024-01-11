#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
entrypoint.py: This script execute the OpenWebservice() function that activate the flask aplication
"""
__author__          = "Robert Rijnbeek"
__version__         = "0.0.1"
__maintainer__      = "Robert Rijnbeek"
__email__           = "robert270384@gmail.com"
__status__          = "Development"

__creation_date__   = '12/11/2023'
__last_update__     = '11/01/2024'

# =============== IMPORTS ==============

from app import create_app

# ==== ACTIVATION OF THE WEBSERVICE ====

app = create_app()
