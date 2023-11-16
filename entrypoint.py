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

__creation_date__   = '17/02/2021'
__last_update__     = '14/03/2021'

# =============== IMPORTS ==============

from app import create_app

# ==== ACTIVATION OF THE WEBSERVICE ====

create_app()