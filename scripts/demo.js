function operator(proxies = [], targetPlatform, context) {
  // 支持快捷操作 不一定要写一个 function
  // 可参考 https://t.me/zhetengsha/970
  // https://t.me/zhetengsha/1009 


  // proxies 为传入的内部节点数组
  // 可在预览界面点击节点查看 JSON 结构 或查看 `target=JSON` 的通用订阅
  // 0. 结构大致参考了 Clash.Meta(mihomo), 可参考 mihomo 的文档, 例如 `xudp`, `smux` 都可以自己设置. 但是有私货, 下面是我能想起来的一些私货
  // 1. `_no-resolve` 为不解析域名
  // 2. 域名解析后 会多一个 `_resolved` 字段, 表示是否解析成功
  // 3. 域名解析后会有`_IPv4`, `_IPv6`, `_IP`(若有多个步骤, 只取第一次成功的 v4 或 v6 数据), `_domain` 字段, `_resolved_ips` 为解析出的所有 IP
  // 4. 节点字段 `exec` 为 `ssr-local` 路径, 默认 `/usr/local/bin/ssr-local`; 端口从 10000 开始递增(暂不支持配置)
  // 5. `_subName` 为单条订阅名
  // 6. `_collectionName` 为组合订阅名
  // 7. `tls-fingerprint` 为 tls 指纹
  // 8. `underlying-proxy` 为前置代理
  // 9. `trojan`, `tuic`, `hysteria`, `hysteria2`, `juicity` 会在解析时设置 `tls`: true (会使用 tls 类协议的通用逻辑),  输出时删除
  // 10. `sni` 在某些协议里会自动与 `servername` 转换
  // 11. 读取节点的 ca-str 和 _ca (后端文件路径) 字段, 自动计算 fingerprint (参考 https://t.me/zhetengsha/1512)
  // 12. 以 Surge 为例, 最新的参数一般我都会跟进, 以 Surge 文档为例, 一些常用的: TUIC/Hysteria 2 的 `ecn`, Snell 的 `reuse` 连接复用, QUIC 策略 block-quic`, Hysteria 2 下载带宽 `down`
  // 
  // 如果只是为了快速修改或者筛选 可以参考 脚本操作支持节点快捷脚本 https://t.me/zhetengsha/970 和 脚本筛选支持节点快捷脚本 https://t.me/zhetengsha/1009

  // $arguments 为传入的脚本参数

  // targetPlatform 为输出的目标平台

  // lodash

  // $substore 为 OpenAPI
  // 参考 https://github.com/Peng-YM/QuanX/blob/master/Tools/OpenAPI/README.md
  
  // scriptResourceCache 缓存
  // 可参考 https://t.me/zhetengsha/1003
  // const cache = scriptResourceCache
  // cache.set(id, data)
  // cache.get(id)

  // ProxyUtils 为节点处理工具
  // 可参考 https://t.me/zhetengsha/1066
  // const ProxyUtils = {
  //     parse, // 订阅解析
  //     process, // 节点操作/文件操作
  //     produce, // 输出订阅
  //     isIPv4,
  //     isIPv6,
  //     isIP,
  //     yaml, // yaml 解析和生成
  //     getFlag, // 获取 emoji 旗帜
  //     removeFlag, // 移除 emoji 旗帜
  //     getISO, // 获取 ISO 3166-1 alpha-2 代码
  //     Gist, // Gist 类
  // }

  // 示例: 给节点名添加前缀
  // $server.name = `[${ProxyUtils.getISO($server.name)}] ${$server.name}`
  // 示例: 给节点名添加旗帜
  // $server.name = `[${ProxyUtils.getFlag($server.name).replace(/🇹🇼/g, '🇼🇸')}] ${ProxyUtils.removeFlag($server.name)}`

  // 示例: 从 sni 文件中读取内容并进行节点操作
  // const sni = await produceArtifact({
  //     type: 'file',
  //     name: 'sni' // 文件名
  // });
  // $server.sni = sni

  // 1. Surge 输出 WireGuard 完整配置

  // let proxies = await produceArtifact({
  //   type: 'subscription',
  //   name: 'sub',
  //   platform: 'Surge',
  //   produceOpts: {
  //     'include-unsupported-proxy': true,
  //   }
  // })
  // $content = proxies
  
  // 2. sing-box

  // 但是一般不需要这样用, 可参考
  // 1. https://t.me/zhetengsha/1111
  // 2. https://t.me/zhetengsha/1070
  // 3. https://t.me/zhetengsha/1241

  // let singboxProxies = await produceArtifact({
  //     type: 'subscription', // type: 'subscription' 或 'collection'
  //     name: 'sub', // subscription name
  //     platform: 'sing-box', // target platform
  //     produceType: 'internal' // 'internal' produces an Array, otherwise produces a String( JSON.parse('JSON String') )
  // })

  // // JSON
  // $content = JSON.stringify({}, null, 2)

  // 3. clash.meta

  // 但是一般不需要这样用, 可参考
  // 1. https://t.me/zhetengsha/1111
  // 2. https://t.me/zhetengsha/1070
  // 3. https://t.me/zhetengsha/1234

  // let clashMetaProxies = await produceArtifact({
  //     type: 'subscription',
  //     name: 'sub',
  //     platform: 'ClashMeta',
  //     produceType: 'internal' // 'internal' produces an Array, otherwise produces a String( ProxyUtils.yaml.safeLoad('YAML String').proxies )
  // })

  // 4. 一个比较折腾的方案: 在脚本操作中, 把内容同步到另一个 gist
  // 见 https://t.me/zhetengsha/1428
  // 
  // const content = ProxyUtils.produce([...proxies], platform)

  // // YAML
  // ProxyUtils.yaml.load('YAML String')
  // ProxyUtils.yaml.safeLoad('YAML String')
  // $content = ProxyUtils.yaml.safeDump({})
  // $content = ProxyUtils.yaml.dump({})

  // 一个往文件里插入本地节点的例子:
  // const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0])
  // let clashMetaProxies = await produceArtifact({
  //     type: 'collection',
  //     name: '机场',
  //     platform: 'ClashMeta',
  //     produceType: 'internal'
  // })
  // yaml.proxies.unshift(...clashMetaProxies)
  // $content = ProxyUtils.yaml.dump(yaml)


  // { $content, $files } will be passed to the next operator 
  // $content is the final content of the file

  // flowUtils 为机场订阅流量信息处理工具
  // 可参考: 
  // 1. https://t.me/zhetengsha/948

  // context 为传入的上下文
  // 有三种情况, 按需判断

  // 若存在 `source._collection` 且 `source._collection.subscriptions` 中的 key 在 `source` 上也存在, 说明输出结果为组合订阅, 但是脚本设置在单条订阅上

  // 若存在 `source._collection` 但 `source._collection.subscriptions` 中的 key 在 `source` 上不存在, 说明输出结果为组合订阅, 脚本设置在组合订阅上

  // 若不存在 `source._collection`, 说明输出结果为单条订阅, 脚本设置在此单条订阅上

  // 1. 输出单条订阅 sub-1 时, 该单条订阅中的脚本上下文为:
  // {
  //   "source": {
  //     "sub-1": {
  //       "name": "sub-1",
  //       "displayName": "",
  //       "mergeSources": "",
  //       "ignoreFailedRemoteSub": true,
  //       "process": [],
  //       "icon": "",
  //       "source": "local",
  //       "url": "",
  //       "content": "",
  //       "ua": "",
  //       "display-name": "",
  //       "useCacheForFailedRemoteSub": false
  //     }
  //   },
  //   "backend": "Node",
  //   "version": "2.14.198"
  // }
  // 2. 输出组合订阅 collection-1 时, 该组合订阅中的脚本上下文为:
  // {
  //   "source": {
  //     "_collection": {
  //       "name": "collection-1",
  //       "displayName": "",
  //       "mergeSources": "",
  //       "ignoreFailedRemoteSub": false,
  //       "icon": "",
  //       "process": [],
  //       "subscriptions": [
  //         "sub-1"
  //       ],
  //       "display-name": ""
  //     }
  //   },
  //   "backend": "Node",
  //   "version": "2.14.198"
  // }
  // 3. 输出组合订阅 collection-1 时, 该组合订阅中的单条订阅 sub-1 中的某个脚本上下文为:
  // {
  //   "source": {
  //     "sub-1": {
  //       "name": "sub-1",
  //       "displayName": "",
  //       "mergeSources": "",
  //       "ignoreFailedRemoteSub": true,
  //       "icon": "",
  //       "process": [],
  //       "source": "local",
  //       "url": "",
  //       "content": "",
  //       "ua": "",
  //       "display-name": "",
  //       "useCacheForFailedRemoteSub": false
  //     },
  //     "_collection": {
  //       "name": "collection-1",
  //       "displayName": "",
  //       "mergeSources": "",
  //       "ignoreFailedRemoteSub": false,
  //       "icon": "",
  //       "process": [],
  //       "subscriptions": [
  //         "sub-1"
  //       ],
  //       "display-name": ""
  //     }
  //   },
  //   "backend": "Node",
  //   "version": "2.14.198"
  // }

  // 参数说明
  // 可参考 https://github.com/sub-store-org/Sub-Store/wiki/%E9%93%BE%E6%8E%A5%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E

  console.log(JSON.stringify(context, null, 2))

  return proxies
}
