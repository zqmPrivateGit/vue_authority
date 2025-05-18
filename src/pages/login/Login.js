import { request } from '@/utils/request';
import { ElMessage } from 'element-plus';

const Login = {
    name: 'Login',
    data() {
        return {
          inputStyle: {},
          account: "",
          password: "",
        };
      },
      created() {
        if (sessionStorage.getItem("token")) {
          this.$router.push("/");
        }
      },
      methods: {
        async routerAdmin() {
          let data = {
            account: this.account,
            password: this.password,
          };
          let res = await request("POST", "/rest/user/login", data);
          if (res.code == 0) {
            const { result } = res.data;
            localStorage.setItem('loginId', result[0].userId);
            localStorage.setItem('userType', result[0].userType);
            sessionStorage.setItem("token", res.data.token);
            let dppRes = await request("POST", "/system/auth/login", {
              username: this.account,
              password: this.password,
            }, '/admin-api');
            console.log('dppRes', dppRes);
            if(dppRes.code == 0) {
              localStorage.setItem("tenantId", dppRes.data.tenantId);
              localStorage.setItem("accessToken", dppRes.data.accessToken);
              this.$router.push("/");
            }
          } else {
            ElMessage.error(res.msg);
          }
        },
      }
}

export default Login;