#!/bin/bash
set -e
set -o pipefail

if [ $# -ne 2 ]
then
  echo "JST Video saas platform tenant provisioning."
  echo "Usage: $0 <ip address> <tenant abbreviation>, e.g. ./provision.sh 115.28.87.102 jst"
  exit 1
fi

SERVER_IP=$1
TENANT=$2

# 为用网址申请Let's Encrypt证书
echo "Apply let's encrypt certificate ..."
ssh -t deploy@$SERVER_IP "./certbot-auto certonly --standalone --pre-hook 'service nginx stop' --post-hook 'service nginx start' -n -d admin.$TENANT.miyx.cn"

# 准备代码部署的文件夹
echo "Prepare folder structure for deployed application ...."
REMOTE_PROJECT_DIR=/var/www/vhosts/jstvideo/$TENANT/jstvideo_web_admin
ssh -t deploy@$SERVER_IP "sudo -u nginx mkdir -p $REMOTE_PROJECT_DIR \
 && sudo -u nginx chmod g+s $REMOTE_PROJECT_DIR \
 && sudo chown -R nginx:deploy $REMOTE_PROJECT_DIR \
 && sudo chmod -R 775 $REMOTE_PROJECT_DIR
"

# 添加用户站点的nginx配置
echo "Add nginx configuration file ..."

# 创建临时文件用来保存生成的nginx配置文件
tmp_nginx_conf=$(mktemp)

# 替换nginx模板中的tenant_abbr变量, 保存到临时文件中
cat template/site.conf | sed "s/{{tenant_abbr}}/$TENANT/g" > $tmp_nginx_conf

# 将产生的nginx配置文件上传到服务器
scp $tmp_nginx_conf deploy@$SERVER_IP:~/jstvideo_web_admin_$TENANT.conf

# 如果之前未添加过该租户的配置文件, 那么在配置文件中include该租户的配置
ssh -t deploy@$SERVER_IP "
if [ ! -d /etc/nginx/conf.d/jstvideo/$TENANT ]; then
  sudo mkdir -p /etc/nginx/conf.d/jstvideo/$TENANT
  echo 'include /etc/nginx/conf.d/jstvideo/$TENANT/*.conf;' | sudo tee -a /etc/nginx/conf.d/jstvideo/tenants.conf
fi
"

# 拷贝上传的配置文件到nginx配置文件夹下
ssh -t deploy@$SERVER_IP "sudo mv /home/deploy/jstvideo_web_admin_$TENANT.conf /etc/nginx/conf.d/jstvideo/$TENANT/jstvideo_web_admin.conf"

echo 'Generating deploy script ...'

# 生成部署脚本
cat template/deploy.sh | sed "s/{{tenant_abbr}}/$TENANT/g" | sed "s/{{ip_addr}}/$SERVER_IP/g" > ../deploy/$TENANT.sh

echo 'Updating deploy/all.sh ...'

# 提醒添加到deploy_all.sh脚本中
echo "./$TENANT.sh" >>../deploy/all.sh

echo "Done"
