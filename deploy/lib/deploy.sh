#
# 部署web app
# 部署方法默认server上当前版本的目录名为current。
# server上的部署文件夹目录结构为：
# /path/to/project/dir/current
#
# 该函数接受两个参数，$1为server的IP地址，$2位部署位置，即部署
# 文件夹结构中的 /path/to/project/dir 部分。
#
# 该函数首先在$2下创建临时文件夹tmp，然后通过scp将本地dist文件夹
# 下的文件拷贝到$2/tmp文件夹中，然后删除$2/current文件夹，最后
# 重命名$2/tmp为$2/current。
#
function deploy_app() {
  echo 'Create temporary directory...'
  ssh deploy@$1 "mkdir -p $2/tmp && rm -rf $2/tmp/*"
  echo 'Uploading source code...'
  scp -r ../dist/* deploy@$1:$2/tmp/
  echo 'Publish new version...'
  ssh deploy@$1 "rm -rf $2/current && mv $2/tmp $2/current"
  echo 'Done'
}
