(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{557:function(s,n,e){"use strict";e.r(n);var a=e(4),t=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p",[s._v("Nginx配置示例：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("#m.58.kankanzuche.com\nserver{\n    listen 80;\n    server_name m.58.kankanzuche.com;\n    return      301 https://$server_name$request_uri; #http转发到https\n    location / {\n        root /datas/www/m_58;\n        index index.html index.htm index.jsp;\n        try_files $uri $uri/ @router;\n    }\n    location @router {\n        rewrite ^.*$ /index.html last;\n    }\n}\nserver {\n        listen 443 ssl http2;\n        server_name m.58.kankanzuche.com;\n        ssl on;\n        ssl_certificate   /etc/nginx/conf.d/m_58/certs/3513291_m.58.kankanzuche.com.pem;\n        ssl_certificate_key /etc/nginx/conf.d/m_58/certs/3513291_m.58.kankanzuche.com.key;\n        ssl_session_timeout 5m;\n        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n        ssl_prefer_server_ciphers on;\n        location / {\n                root /datas/www/m_58;\n                index index.html index.htm;\n                try_files $uri $uri/ @router;\n                error_page 405 =200 http://$host$request_uri;\n        }\n        location @router {\n                rewrite ^.*$ /index.html last;\n        }\n\n        #配置静态资源，多种文件格式在括号内用|分割\n        location ~ .*\\.(txt)$ {\n                expires 24h;\n                root /etc/nginx/conf.d/m_58/static/;#指定文件路径\n                client_max_body_size 10m;\n                client_body_buffer_size 1280k;\n                proxy_connect_timeout 900;\n                proxy_send_timeout 900;\n                proxy_read_timeout 900;\n                proxy_buffer_size 40k;\n                proxy_buffers 40 320k;\n                proxy_busy_buffers_size 640k;\n                proxy_temp_file_write_size 640k;\n\n        }\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br")])])])}),[],!1,null,null,null);n.default=t.exports}}]);