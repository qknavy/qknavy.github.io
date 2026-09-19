import{_ as n,c as a,a as e,o as l}from"./app-Ds2R91U1.js";const t="/assets/image-20260907185232532-DVTmOBVj.png",p="/assets/image-20260907154619660-B_Wl64x2.png",c="/assets/image-20260907154925606-tjuN5axN.png",i="/assets/image-20260907155256752-ChjXvVlk.png",o="/assets/image-20260907184358593-BNBlbrO_.png",r="/assets/image-20260907235841868-SpfK1RBG.png",m="/assets/image-20260908000427807-CkjGpYCN.png",u="/assets/image-20260908001952141-DKWHqDkF.png",d={};function v(k,s){return l(),a("div",null,[...s[0]||(s[0]=[e('<p>前面快速启动了一个单节点的rocketmq实例，并通过rocketmq自带的生产者消费者方式和java客户端方式体验了一下RocketMQ的基本用法，本文主要搭建一个3主3从的RocketMQ集群和web管理控制台</p><h2 id="_1、主机规划" tabindex="-1"><a class="header-anchor" href="#_1、主机规划"><span>1、主机规划</span></a></h2><table><thead><tr><th>主机</th><th>nameserver</th><th>broker</th></tr></thead><tbody><tr><td>节点1：192.168.0.61</td><td>node</td><td>broker-a（10911）、broker-b-s（11011）、broker-c-s（12011）</td></tr><tr><td>节点2：192.168.0.62</td><td>node</td><td>broker-a-s（11011）、broker-b（10911）、broker-c-s（12011）</td></tr><tr><td>节点3：192.168.0.63</td><td>node</td><td>broker-a-s（11011）、broker-b-s（12011）、broker-c（10911）</td></tr></tbody></table><p><img src="'+t+`" alt="image-20260907185232532"></p><h2 id="_2、启动nameserver" tabindex="-1"><a class="header-anchor" href="#_2、启动nameserver"><span>2、启动nameserver</span></a></h2><p>在三个节点上分别执行nameserver启动脚本</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 后台启动nameserver</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqnamesrv <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看启动日志</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-100f</span> ~/logs/rocketmqlogs/namesrv.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志输出：</p><p><img src="`+p+'" alt="image-20260907154619660"></p><p>可以看到三个节点的nameserver都已经成功启动了</p><h2 id="_3、broker配置-注意路径" tabindex="-1"><a class="header-anchor" href="#_3、broker配置-注意路径"><span>3、broker配置（注意路径）</span></a></h2><p>进入config目录，可以看到默认只有单节点配置、2主0从、2主2从同步、2主2从异步：</p><p><img src="'+c+'" alt="image-20260907154925606"></p><p>这里我们复制一个3主3从同步的配置</p><p><img src="'+i+`" alt="image-20260907155256752"></p><h3 id="_3-1、修改节点1上的配置" tabindex="-1"><a class="header-anchor" href="#_3-1、修改节点1上的配置"><span>3.1、修改节点1上的配置</span></a></h3><h4 id="broker-a-properties" tabindex="-1"><a class="header-anchor" href="#broker-a-properties"><span><code>broker-a.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token comment"># 集群名称</span></span>
<span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token comment"># broker名字，主从节点名字一样</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-a</span></span>
<span class="line"><span class="token comment"># brokerId，0-主节点，非0-从节点</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">0</span></span>
<span class="line"><span class="token comment"># nameserver的地址</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">10911</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">48</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SYNC_MASTER</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-b-s-properties" tabindex="-1"><a class="header-anchor" href="#broker-b-s-properties"><span><code>broker-b-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-b</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11011</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-c-s-properties" tabindex="-1"><a class="header-anchor" href="#broker-c-s-properties"><span><code>broker-c-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-c</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11012</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意：**这里配置5类文件存储目录，需要提前建好：</p><ul><li>storePathRootDir：数据存储路径</li><li>storePathCommitLog：commitLog 存储路径</li><li>storePathConsumeQueue：消费队列存储路径存储路径</li><li>storePathIndex：消息索引存储路径</li><li>storeCheckpoint：checkpoint 文件存储路径</li><li>abortFile：abort 文件存储路径</li></ul><h3 id="_3-2、修改节点2上的配置" tabindex="-1"><a class="header-anchor" href="#_3-2、修改节点2上的配置"><span>3.2、修改节点2上的配置</span></a></h3><h4 id="broker-b-properties" tabindex="-1"><a class="header-anchor" href="#broker-b-properties"><span><code>broker-b.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token comment"># 集群名称</span></span>
<span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token comment"># broker名字，主从节点名字一样</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-b</span></span>
<span class="line"><span class="token comment"># brokerId，0-主节点，非0-从节点</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">0</span></span>
<span class="line"><span class="token comment"># nameserver的地址</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">10911</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">48</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SYNC_MASTER</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-a-s-properties" tabindex="-1"><a class="header-anchor" href="#broker-a-s-properties"><span><code>broker-a-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-a</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11012</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-c-s-properties-1" tabindex="-1"><a class="header-anchor" href="#broker-c-s-properties-1"><span><code>broker-c-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-c</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11012</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3、修改节点3上的配置" tabindex="-1"><a class="header-anchor" href="#_3-3、修改节点3上的配置"><span>3.3、修改节点3上的配置</span></a></h3><h4 id="broker-c-properties" tabindex="-1"><a class="header-anchor" href="#broker-c-properties"><span><code>broker-c.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token comment"># broker名字，主从节点名字一样</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-c</span></span>
<span class="line"><span class="token comment"># brokerId，0-主节点，非0-从节点</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">0</span></span>
<span class="line"><span class="token comment"># nameserver的地址</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">10911</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">48</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-c/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SYNC_MASTER</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-a-s-properties-1" tabindex="-1"><a class="header-anchor" href="#broker-a-s-properties-1"><span><code>broker-a-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-a</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11012</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-a-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="broker-b-s-properties-1" tabindex="-1"><a class="header-anchor" href="#broker-b-s-properties-1"><span><code>broker-b-s.properties</code></span></a></h4><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">brokerClusterName</span><span class="token punctuation">=</span><span class="token value attr-value">Rocket-Cluster</span></span>
<span class="line"><span class="token key attr-name">brokerName</span><span class="token punctuation">=</span><span class="token value attr-value">broker-b</span></span>
<span class="line"><span class="token comment">#0 表示 Master，&gt;0 表示 Slave</span></span>
<span class="line"><span class="token key attr-name">brokerId</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token comment">#nameServer地址，分号分割</span></span>
<span class="line"><span class="token key attr-name">namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876</span></span>
<span class="line"><span class="token comment">#在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span class="token key attr-name">defaultTopicQueueNums</span><span class="token punctuation">=</span><span class="token value attr-value">4</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建Topic，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateTopicEnable</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span class="token key attr-name">autoCreateSubscriptionGroup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token comment">#Broker 对外服务的监听端口</span></span>
<span class="line"><span class="token key attr-name">listenPort</span><span class="token punctuation">=</span><span class="token value attr-value">11011</span></span>
<span class="line"><span class="token comment">#删除文件时间点，默认凌晨 4点</span></span>
<span class="line"><span class="token key attr-name">deleteWhen</span><span class="token punctuation">=</span><span class="token value attr-value">04</span></span>
<span class="line"><span class="token comment">#文件保留时间，默认 48 小时</span></span>
<span class="line"><span class="token key attr-name">fileReservedTime</span><span class="token punctuation">=</span><span class="token value attr-value">120</span></span>
<span class="line"><span class="token comment">#commitLog每个文件的大小默认1G</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">1073741824</span></span>
<span class="line"><span class="token comment">#ConsumeQueue每个文件默认存30W条，根据业务情况调整</span></span>
<span class="line"><span class="token key attr-name">mapedFileSizeConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">300000</span></span>
<span class="line"><span class="token comment">#destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span class="token comment">#redeleteHangedFileInterval=120000</span></span>
<span class="line"><span class="token comment">#检测物理文件磁盘空间</span></span>
<span class="line"><span class="token key attr-name">diskMaxUsedSpaceRatio</span><span class="token punctuation">=</span><span class="token value attr-value">88</span></span>
<span class="line"><span class="token comment">#存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathRootDir</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s</span></span>
<span class="line"><span class="token comment">#commitLog 存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathCommitLog</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/commitlog</span></span>
<span class="line"><span class="token comment">#消费队列存储路径存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathConsumeQueue</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/consumequeue</span></span>
<span class="line"><span class="token comment">#消息索引存储路径</span></span>
<span class="line"><span class="token key attr-name">storePathIndex</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/index</span></span>
<span class="line"><span class="token comment">#checkpoint 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">storeCheckpoint</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/checkpoint</span></span>
<span class="line"><span class="token comment">#abort 文件存储路径</span></span>
<span class="line"><span class="token key attr-name">abortFile</span><span class="token punctuation">=</span><span class="token value attr-value">/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/data/store-b-s/abort</span></span>
<span class="line"><span class="token comment">#限制的消息大小</span></span>
<span class="line"><span class="token key attr-name">maxMessageSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token comment">#flushCommitLogLeastPages=4</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span class="token comment">#flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span class="token comment">#flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span class="token comment">#Broker 的角色</span></span>
<span class="line"><span class="token comment">#- ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span class="token comment">#- SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span class="token comment">#- SLAVE</span></span>
<span class="line"><span class="token key attr-name">brokerRole</span><span class="token punctuation">=</span><span class="token value attr-value">SLAVE</span></span>
<span class="line"><span class="token comment">#刷盘方式</span></span>
<span class="line"><span class="token comment">#- ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span class="token comment">#- SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span class="token key attr-name">flushDiskType</span><span class="token punctuation">=</span><span class="token value attr-value">ASYNC_FLUSH</span></span>
<span class="line"><span class="token comment">#checkTransactionMessageEnable=false</span></span>
<span class="line"><span class="token comment">#发消息线程池数量</span></span>
<span class="line"><span class="token comment">#sendMessageThreadPoolNums=128</span></span>
<span class="line"><span class="token comment">#拉消息线程池数量</span></span>
<span class="line"><span class="token comment">#pullMessageThreadPoolNums=128</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、启动" tabindex="-1"><a class="header-anchor" href="#_4、启动"><span>4、启动</span></a></h2><h3 id="_4-1、在节点1上执行" tabindex="-1"><a class="header-anchor" href="#_4-1、在节点1上执行"><span>4.1、在节点1上执行</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动broker-a</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-a.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-b-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-b-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-c-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-c-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、在节点2上执行" tabindex="-1"><a class="header-anchor" href="#_4-2、在节点2上执行"><span>4.2、在节点2上执行</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动broker-b</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-b.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-a-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-a-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-c-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-c-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3、在节点3上执行" tabindex="-1"><a class="header-anchor" href="#_4-3、在节点3上执行"><span>4.3、在节点3上执行</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动broker-c</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-c.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-a-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-a-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动broker-b-s</span></span>
<span class="line"><span class="token function">nohup</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/bin/mqbroker <span class="token parameter variable">-c</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/broker-b-s.properties <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、检查集群状态" tabindex="-1"><a class="header-anchor" href="#_5、检查集群状态"><span>5、检查集群状态</span></a></h2><p>通过<code>mqadmin</code>命令可以插件集群的状态</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">mqadmin clusterlist <span class="token parameter variable">-n</span> <span class="token number">192.168</span>.0.61:9876<span class="token punctuation">\\</span><span class="token punctuation">;</span><span class="token number">192.168</span>.0.62:9876<span class="token punctuation">\\</span><span class="token punctuation">;</span><span class="token number">192.168</span>.0.63:9876</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>结果如下，3主3从集群运行正常：</p><p><img src="`+o+'" alt="image-20260907184358593"></p><h2 id="_6、web管理控制台" tabindex="-1"><a class="header-anchor" href="#_6、web管理控制台"><span>6、Web管理控制台</span></a></h2><h3 id="_6-1、下载-打包" tabindex="-1"><a class="header-anchor" href="#_6-1、下载-打包"><span>6.1、下载 &amp; 打包</span></a></h3><p>和kafka一样，RocketMQ并没有自带类似RabbitMQ的web-manager的控制台，需要自己单独部署，项目地址：</p><p>https://github.com/apache/rocketmq-dashboard</p><p>下载源码，用命令行或者IDE进行打包，在target下可以得到一个可运行的jar包：</p><p><img src="'+r+`" alt="image-20260907235841868"></p><h3 id="_6-2、运行" tabindex="-1"><a class="header-anchor" href="#_6-2、运行"><span>6.2、运行</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> rocketmq-dashboard-2.1.1-SNAPSHOT.jar <span class="token parameter variable">--server.port</span><span class="token operator">=</span><span class="token number">8080</span> <span class="token parameter variable">--rocketmq.config.namesrvAddr</span><span class="token operator">=</span><span class="token number">192.168</span>.0.61:9876<span class="token punctuation">;</span><span class="token number">192.168</span>.0.62:9876<span class="token punctuation">;</span><span class="token number">192.168</span>.0.63:9876 <span class="token operator">&gt;&gt;</span> ./mq-console.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动成功之后打开浏览器页面：http://[ip]:8080，默认端口号是8082，默认连接的nameserver地址是<code>127.0.0.1:9876</code>，且无需账号密码就可以直接进入</p><p><img src="`+m+`" alt="image-20260908000427807"></p><p>要想通过账号密码登录，需要修改<code>application.properties</code>文件：</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">rocketmq</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">loginRequired</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>账号密码配置在<code>users.properties</code></p><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token comment"># Define Admin</span></span>
<span class="line"><span class="token key attr-name">super</span><span class="token punctuation">=</span><span class="token value attr-value">admin,1</span></span>
<span class="line"><span class="token comment"># Define Users</span></span>
<span class="line"><span class="token key attr-name">user1</span><span class="token punctuation">=</span><span class="token value attr-value">user</span></span>
<span class="line"><span class="token key attr-name">user2</span><span class="token punctuation">=</span><span class="token value attr-value">user</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的意思是定义了一个管理员账户super，密码是admin，同时定义了两个普通账户user1和user2，密码都是user。其中格式未：<code>账号=密码{,角色}</code>，角色为可选值，值为1的时候表示是管理员，其它值就是普通账户</p><p>配置修改完成后重新打包重启，再进入页面就会提示输入账号密码了</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> rocketmq-dashboard-2.1.1-SNAPSHOT.jar <span class="token parameter variable">--server.port</span><span class="token operator">=</span><span class="token number">8080</span> <span class="token parameter variable">--rocketmq.config.namesrvAddr</span><span class="token operator">=</span><span class="token number">192.168</span>.0.61:9876<span class="token punctuation">;</span><span class="token number">192.168</span>.0.62:9876<span class="token punctuation">;</span><span class="token number">192.168</span>.0.63:9876 <span class="token operator">&gt;&gt;</span> ./mq-console.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+u+`" alt="image-20260908001952141"></p><h3 id="_6-3、docker方式安装" tabindex="-1"><a class="header-anchor" href="#_6-3、docker方式安装"><span>6.3、docker方式安装</span></a></h3><p>除了源码安装方式，也可以用docker方式，而且更简单，只需要一条命令就可以启动</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 默认启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> rocketmq-dashboard <span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Drocketmq.namesrv.addr=192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876&quot;</span> <span class="token parameter variable">-p</span> <span class="token number">8082</span>:8082 <span class="token parameter variable">-t</span> apacherocketmq/rocketmq-dashboard:latest</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开启鉴权，需要手动创建/home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/dashboard-data这个目录，并且将users.properties文件放到这个目录下</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> rocketmq-dashboard <span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Drocketmq.namesrv.addr=192.168.0.61:9876;192.168.0.62:9876;192.168.0.63:9876&quot;</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">ROCKETMQ_CONFIG_LOGIN_REQUIRED</span><span class="token operator">=</span>true <span class="token parameter variable">-p</span> <span class="token number">8082</span>:8082 <span class="token parameter variable">-v</span> /home/ubuntu/tools/rocketmq/rocketmq-all-5.5.1-bin-release/conf/3m-3s-sync/dashboard-data:/tmp/rocketmq-console/data <span class="token parameter variable">-t</span> apacherocketmq/rocketmq-dashboard:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者用docker-compose</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"> </span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rocketmq-dashboard</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> apacherocketmq/rocketmq<span class="token punctuation">-</span>dashboard<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> 8082<span class="token punctuation">:</span><span class="token number">8082</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 数据目录映射, user.properties需要放在data目录下</span></span>
<span class="line">      <span class="token punctuation">-</span> /home/ubuntu/tools/rocketmq/rocketmq<span class="token punctuation">-</span>all<span class="token punctuation">-</span>5.5.1<span class="token punctuation">-</span>bin<span class="token punctuation">-</span>release/conf/3m<span class="token punctuation">-</span>3s<span class="token punctuation">-</span>sync/dashboard<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/tmp/rocketmq<span class="token punctuation">-</span>console/data </span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> NAMESRV_ADDR=192.168.0.61<span class="token punctuation">:</span>9876;192.168.0.62<span class="token punctuation">:</span>9876;192.168.0.63<span class="token punctuation">:</span><span class="token number">9876</span></span>
<span class="line">      <span class="token comment"># 开启登录认证</span></span>
<span class="line">      <span class="token punctuation">-</span> ROCKETMQ_CONFIG_LOGIN_REQUIRED=true </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果docker镜像拉取不下来也可用用我自己保存下来的镜像：registry.cn-hangzhou.aliyuncs.com/xhsx/rocketmq-dashboard:latest</p></blockquote><hr><p><img src="https://img.shengxiao.tech/common/huifeidehouer.png" alt="扫码关注"></p>`,76)])])}const h=n(d,[["render",v]]),y=JSON.parse('{"path":"/series/mq/rocketmq/02RocketMQde3zhu3congjiqunbushu.html","title":"2、RocketMQ的3主3从集群部署","lang":"en-US","frontmatter":{"title":"2、RocketMQ的3主3从集群部署","date":"2026-09-07T00:00:00.000Z","categories":["mq"],"tags":["rocketmq"]},"headers":[{"level":2,"title":"1、主机规划","slug":"_1、主机规划","link":"#_1、主机规划","children":[]},{"level":2,"title":"2、启动nameserver","slug":"_2、启动nameserver","link":"#_2、启动nameserver","children":[]},{"level":2,"title":"3、broker配置（注意路径）","slug":"_3、broker配置-注意路径","link":"#_3、broker配置-注意路径","children":[{"level":3,"title":"3.1、修改节点1上的配置","slug":"_3-1、修改节点1上的配置","link":"#_3-1、修改节点1上的配置","children":[]},{"level":3,"title":"3.2、修改节点2上的配置","slug":"_3-2、修改节点2上的配置","link":"#_3-2、修改节点2上的配置","children":[]},{"level":3,"title":"3.3、修改节点3上的配置","slug":"_3-3、修改节点3上的配置","link":"#_3-3、修改节点3上的配置","children":[]}]},{"level":2,"title":"4、启动","slug":"_4、启动","link":"#_4、启动","children":[{"level":3,"title":"4.1、在节点1上执行","slug":"_4-1、在节点1上执行","link":"#_4-1、在节点1上执行","children":[]},{"level":3,"title":"4.2、在节点2上执行","slug":"_4-2、在节点2上执行","link":"#_4-2、在节点2上执行","children":[]},{"level":3,"title":"4.3、在节点3上执行","slug":"_4-3、在节点3上执行","link":"#_4-3、在节点3上执行","children":[]}]},{"level":2,"title":"5、检查集群状态","slug":"_5、检查集群状态","link":"#_5、检查集群状态","children":[]},{"level":2,"title":"6、Web管理控制台","slug":"_6、web管理控制台","link":"#_6、web管理控制台","children":[{"level":3,"title":"6.1、下载 & 打包","slug":"_6-1、下载-打包","link":"#_6-1、下载-打包","children":[]},{"level":3,"title":"6.2、运行","slug":"_6-2、运行","link":"#_6-2、运行","children":[]},{"level":3,"title":"6.3、docker方式安装","slug":"_6-3、docker方式安装","link":"#_6-3、docker方式安装","children":[]}]}],"git":{"createdTime":1789795710000,"updatedTime":1789795710000,"contributors":[{"name":"qknavy","email":"qknavy@aliyun.com","commits":1}]},"filePathRelative":"series/mq/rocketmq/02RocketMQ的3主3从集群部署.md"}');export{h as comp,y as data};
