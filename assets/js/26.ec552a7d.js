(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{538:function(s,e,n){"use strict";n.r(e);var a=n(4),t=Object(a.a)({},(function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"内网不互通的云服务器安装k8s"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内网不互通的云服务器安装k8s"}},[s._v("#")]),s._v(" 内网不互通的云服务器安装k8s")]),s._v(" "),n("h2",{attrs:{id:"前言"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),n("p",[s._v("我想玩玩k8s，但是我的云服务器是内网不互通的，装了好久，所以记录一下")]),s._v(" "),n("h2",{attrs:{id:"安装docker"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装docker"}},[s._v("#")]),s._v(" 安装docker")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('yum update -y\n##安装docker\nyum install -y docker\n##更换成国内镜像\ncat <<EOF> /etc/docker/daemon.json\n{\n  "registry-mirrors": [\n    "https://dockerhub.azk8s.cn",\n    "https://registry.docker-cn.com"\n ] \n}\nEOF\n## 开机自启动docker\nsystemctl enable docker\nsystemctl start docker\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("h2",{attrs:{id:"安装kubeadm-kubelet-kubectl"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装kubeadm-kubelet-kubectl"}},[s._v("#")]),s._v(" 安装kubeadm kubelet kubectl")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("##更换yum里面的k8s源\ncat <<EOF > /etc/yum.repos.d/kubernetes.repo\n[kubernetes]\nname=Kubernetes\nbaseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=0\ngpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg\n       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg\nEOF\n#关闭\nsetenforce 0\nsed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config\n#安装kubectl等组件\nyum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes\n#启动kubelet\nsystemctl enable --now kubelet\n # 加载br_netfilter模块，使用lsmod查看开启的模块\nyum install -y bridge-utils.x86_64\nmodprobe  br_netfilter \n#修改路由\ncat <<EOF >  /etc/sysctl.d/k8s.conf\nnet.bridge.bridge-nf-call-ip6tables = 1\nnet.bridge.bridge-nf-call-iptables = 1\nEOF\nsysctl --system  \n# 关闭防火墙\nsystemctl disable firewalld \n# k8s要求关闭swap  (qxl)\nswapoff -a && sysctl -w vm.swappiness=0  \nsed -ri '/^[^#]*swap/s@^@#@' /etc/fstab  \n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br")])]),n("p",[s._v("到此准备工作就完事了")]),s._v(" "),n("h2",{attrs:{id:"内网不互通的解决办法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内网不互通的解决办法"}},[s._v("#")]),s._v(" 内网不互通的解决办法")]),s._v(" "),n("p",[s._v("（这里写的是我解决问题的思路–虽然都是百度，安装过程在下面）")]),s._v(" "),n("p",[s._v("我首先想到的是百度，查找到了这篇文章")]),s._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/qq_33996921/article/details/103529312",target:"_blank",rel:"noopener noreferrer"}},[n("code",[s._v("内网不在一个网段的两台云服务器搭建K8S 遇到的坑及解决方案")]),n("OutboundLink")],1)]),s._v(" "),n("p",[s._v("使用nat进行转发，这样安装是能够安装成功的，但是flannel网络的问题并没有解决，因为flannel记录的ip是你的内网ip。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('[root@instance-l33lcu5d ~]#kubectl describe node instance-l33lcu5d\nName:               instance-l33lcu5d\nRoles:              master\nLabels:             beta.kubernetes.io/arch=amd64\n                    beta.kubernetes.io/os=linux\n                    kubernetes.io/arch=amd64\n                    kubernetes.io/hostname=instance-l33lcu5d\n                    kubernetes.io/os=linux\n                    node-role.kubernetes.io/master=\nAnnotations:        flannel.alpha.coreos.com/backend-data: {"VtepMAC":"0a:20:4b:67:0c:1c"}\n                    flannel.alpha.coreos.com/backend-type: vxlan\n                    flannel.alpha.coreos.com/kube-subnet-manager: true\n                    flannel.alpha.coreos.com/public-ip: 192.168.48.4\n                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("p",[s._v("通过上述命令可以看到，flannel给打的注解是public-ip +内网地址 。虽然我设置了转发，但是flannel还是没有打通集群中pod的通信。")]),s._v(" "),n("p",[s._v("菜鸟又找到了一篇文章："),n("a",{attrs:{href:"https://www.oschina.net/question/1240201_2303617",target:"_blank",rel:"noopener noreferrer"}},[n("code",[s._v("不同nat设备后的网络节点如何组成一个k8s集群")]),n("OutboundLink")],1),s._v(" 在这个大佬的回答里说了一句flannel的文档有答案。")]),s._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/coreos/flannel",target:"_blank",rel:"noopener noreferrer"}},[n("code",[s._v("flannel github")]),n("OutboundLink")],1)]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_1.png",alt:"53_1.png"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_2.png",alt:"53_2.png"}}),s._v("这句话很简单，就是当node设置了external ip的时候，flannel会自动给node加一个注解public-ip-overwrite，然后会基于这个ip去重置flannel网络。")]),s._v(" "),n("p",[s._v("但是我找了好久也没找到如何给node设置external ip，但是我转念一想，我自己加一个注解不就行了")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("kubectl annotate nodes instance-l33lcu5d flannel.alpha.coreos.com/public-ip-overwrite=180.76.155.95\nkubectl annotate nodes instance-jak59008 flannel.alpha.coreos.com/public-ip-overwrite=106.12.206.160\nkubectl annotate nodes instance-8x864u54 flannel.alpha.coreos.com/public-ip-overwrite=106.13.82.225\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_3.png",alt:"53_3.png"}})]),s._v(" "),n("p",[s._v("果然，有了这个注解，flannel的public-ip被修改了。 然后直接kubectl apply -f flannel.yml 再部署一下kubectl apply -f ingress-nginx.yml。试一下")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_4.png",alt:"53_4.png"}})]),s._v(" "),n("p",[s._v("可以看到我部署了ingress-nginx的pod，他的pod ip是10.244.3.3,部署的机器是instance-8x864u54 ，我现在的机器是master节点root@instance-l33lcu5d 。测试一下集群访问pod ip；")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_5.png",alt:"53_5.png"}}),s._v("因为我没有配置ingress，所以这里显示404，ok，集群与pod通信没问题了，")]),s._v(" "),n("p",[s._v("这里查一下ingress的服务，暴露的端口是32626")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_6.png",alt:"53_6.png"}})]),s._v(" "),n("p",[s._v("去浏览器测试一下")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_7.png",alt:"53_7.png"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_8.png",alt:"53_8.png"}})]),s._v(" "),n("p",[s._v("完美，通过nodeport方式部署的service能够正确访问到pod。")]),s._v(" "),n("p",[s._v("但是因为内网不互通的原因，除非在iptables 加上nat转发，也就是第一篇文档里面说的哪种方式，不然kubectl exec 的方式进入容器会有点问题")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_9.png",alt:"53_9.png"}})]),s._v(" "),n("p",[s._v("但是也可以去node节点直接使用docker exec，所以这个也就不算什么问题了")]),s._v(" "),n("h2",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),n("p",[n("a",{attrs:{href:"https://kubernetes.io/zh/docs/setup/independent/create-cluster-kubeadm/",target:"_blank",rel:"noopener noreferrer"}},[n("code",[s._v("安装的官方文档")]),n("OutboundLink")],1)]),s._v(" "),n("p",[s._v("因为我的内网不互通，所以kubeadm init的时候选择的是外网ip，但是我用的是百度云服务器，所以没有外网网卡")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("kubeadm init  --kubernetes-version=v1.17.0 --image-repository registry.aliyuncs.com/google_containers --apiserver-advertise-address=[public ip] --pod-network-cidr=10.244.0.0/16\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("因为没有外网网卡，但是选择了外网ip，所以初始化的时候会出点问题。 k8s安装的时候会写入文件，在这个阻塞的时候， 我们去改一下配置")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("vim /etc/kubernetes/manifests/etcd.yml\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("将这两处改成这样就行了")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_10.png",alt:"53_10.png"}})]),s._v(" "),n("p",[s._v("等初始化成功后，拿着它提供的token去node执行命令加入集群；")]),s._v(" "),n("p",[s._v("加入集群后查看node；")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_11.png",alt:"53_11.png"}})]),s._v(" "),n("p",[s._v("给node加上注解publuc-ip-overwrite，方便flannel正确注册子网")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("kubectl annotate nodes instance-l33lcu5d flannel.alpha.coreos.com/public-ip-overwrite=180.76.155.95\nkubectl annotate nodes instance-jak59008 flannel.alpha.coreos.com/public-ip-overwrite=106.12.206.160\nkubectl annotate nodes instance-8x864u54 flannel.alpha.coreos.com/public-ip-overwrite=106.13.82.225\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("安装网络插件flannel：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v(" kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h2",{attrs:{id:"安装ingress-nginx"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装ingress-nginx"}},[s._v("#")]),s._v(" 安装ingress-nginx")]),s._v(" "),n("p",[s._v("ingress-nginx的镜像不是很好下。但是我们可以先用docker的方式下载")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("docker pull quay.mirrors.ustc.edu.cn/kubernetes-ingress-controller/nginx-ingress-controller:0.26.2\ndocker tag quay.mirrors.ustc.edu.cn/kubernetes-ingress-controller/nginx-ingress-controller:0.26.2 quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.26.2\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("安装")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.26.2/deploy/static/provider/baremetal/service-nodeport.yaml\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h2",{attrs:{id:"安装dashboard并配置https访问"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装dashboard并配置https访问"}},[s._v("#")]),s._v(" 安装dashboard并配置https访问")]),s._v(" "),n("p",[s._v("安装dashboard")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc1/aio/deploy/recommended.yaml\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("配置https并使用ingress转发")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('apiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  name: sudooom-dashboard\n  namespace: kubernetes-dashboard\n  annotations:\n    kubernetes.io/ingress.class: "nginx"\n    nginx.ingress.kubernetes.io/backend-protocol: "HTTPS" # 这里必须加，因为dashboard要求https访问\nspec:\n  rules:\n    - host: dashboard.sudooom.com\n      http:\n        paths:\n        - path: /\n          backend:\n            serviceName: kubernetes-dashboard\n            servicePort: 443\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("p",[s._v("配置一下dns解析，我加了一个dashboard.sudooom.com")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_12.png",alt:"53_12.png"}})]),s._v(" "),n("p",[s._v("通过浏览器访问")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://tech.souyunku.com/wp-content/uploads/2020/8/813/141029/3/53_13.png",alt:"53_13.png"}})]),s._v(" "),n("p",[s._v("因为其他账号没有权限，我给dashboard配置一个权限高的账号")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: admin-user\n  namespace: kube-system\n\n\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  name: admin-user\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: ClusterRole\n  name: cluster-admin\nsubjects:\n- kind: ServiceAccount\n  name: admin-user\n  namespace: kube-system\nkubectl apply -f dashboard_auth.yml\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("查询这个账号的token")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("kubectl -n kube-system describe secret `kubectl describe sa admin-user -n kube-system|grep 'Mountable secrets'|awk '{print $3}'`\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("输入token就可以登录了")]),s._v(" "),n("p",[s._v("文章永久链接：https://tech.souyunku.com/?p=42446")])])}),[],!1,null,null,null);e.default=t.exports}}]);