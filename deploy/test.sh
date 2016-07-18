#!/bin/bash
set -e
set -o pipefail

# 加载部署过程
. ./lib/deploy.sh

# 调用部署过程
echo '正在部署test...'
deploy_app 115.28.1.250 /var/www/vhosts/jstvideo/test/jstvideo_web_admin
