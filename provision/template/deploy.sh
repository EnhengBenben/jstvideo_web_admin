#!/bin/bash
set -e
set -o pipefail

# 加载部署过程
. ./lib/deploy.sh

# 调用部署过程
echo '正在部署{{tenant_abbr}}...'
deploy_app {{ip_addr}} /var/www/vhosts/jstvideo/{{tenant_abbr}}/jstvideo_web_admin
