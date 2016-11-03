# API 域名

开发版API暂时都通过HTTP进行，API访问域名为

- **本地节点**: <http://192.168.1.120/openapi>
- **线上节点**: 暂时没有上线

域名之后衔接 API 版本号，如`/1.0/`，代表正在使用 1.0 版的 API。

# 在线测试
暂时没有开发，推荐使用Postman进行接口调试，[Postman下载地址](http://baidu.com)

# 对象
<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.0/classes/&lt;tableName&gt;</td>
      <td>POST</td>
      <td>创建对象</td>
    </tr>
    <tr>
      <td>/1.0/classes/&lt;tableName&gt;/&lt;id&gt;</td>
      <td>GET</td>
      <td>获取对象</td>
    </tr>
    <tr>
      <td>/1.0/classes/&lt;tableName&gt;/&lt;id&gt;</td>
      <td>PUT</td>
      <td>更新对象</td>
    </tr>
    <tr>
      <td>/1.0/classes/&lt;tableName&gt;</td>
      <td>GET</td>
      <td>查询对象</td>
    </tr>
    <tr>
      <td>/1.0/classes/&lt;tableName&gt;/&lt;id&gt;</td>
      <td>DELETE</td>
      <td>删除对象</td>
    </tr>
  </tbody>
</table>

# 用户

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.0/users/signUp</td>
      <td>POST</td>
      <td>用户注册</td>
    </tr>
    <tr>
      <td>/1.0/users/login</td>
      <td>GET</td>
      <td>用户登录</td>
    </tr>
    
    <tr>
      <td>/1.0/users/current</td>
      <td>GET</td>
      <td>根据 <a href="js_guide.html#SessionToken">token</a> 获取用户信息</td>
    </tr>
    <tr>
      <td>/1.0/users/resetPassword</td>
      <td>PUT</td>
      <td>更新自己的密码，要求输入旧密码。</td>
    </tr>
    <tr>
      <td>/1.0/users/checkField</td>
      <td>GET</td>
      <td>检测字段是否已经存在</td>
    </tr>
    <tr>
      <td>/1.0/users/info</td>
      <td>PUT</td>
      <td>更新当前用户</td>
    </tr>
    <tr>
      <td>/1.0/users/&lt;id&gt;</td>
      <td>GET</td>
      <td>获取用户(暂缓实现)</td>
    </tr>
    <tr>
      <td>/1.0/users/&lt;id&gt;</td>
      <td>DELETE</td>
      <td>删除用户</td>
    </tr>
  </tbody>
</table>

# 角色

暂无

# 打包请求(暂缓实现)

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.0/batch</td>
      <td>POST</td>
      <td>打包请求</td>
    </tr>
  </tbody>
</table>

# 上传

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.0/upload</td>
      <td>POST</td>
      <td>上传</td>
    </tr>
  </tbody>
</table>


# 云函数

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.0/functions</td>
      <td>POST</td>
      <td>调用云函数，与原api接近，调用封装后的api使用</td>
    </tr>
  </tbody>
</table>