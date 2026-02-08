import RegisterView from "../views/base/Register.jsx";

export default function RegisterRoute() {
    return <RegisterView />;
}

export async function action({ request }) {
    // 这里可以处理表单提交，但我们使用客户端处理
    return null;
}