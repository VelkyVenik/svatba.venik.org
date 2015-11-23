#!/bin/bash

PASS=$(cat ~/.private/ftp.venik.org)

ncftpput -R -u venikorg -p $PASS ftpx.forpsi.com subdoms/svatba *
