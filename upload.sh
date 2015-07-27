#!/bin/bash

PASS=$(cat ~/.private/ftp.venik.org)

ncftpput -R -u venik.org -p $PASS ftp.venik.org svatba *
