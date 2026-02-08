import LoginView from "../views/base/Login.jsx";

export default function LoginRoute() {
    return <LoginView />;
}

export async function action({ request }) {
    // 这里可以处理表单提交，但我们使用客户端处理
    return null;
}