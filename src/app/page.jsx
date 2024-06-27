"use client";
import React from "react";

function MainComponent() {
  const [inquiries, setInquiries] = React.useState([
    {
      id: 1,
      name: "Taro Yamada",
      email: "taro@example.com",
      message: "お問い合わせ内容1",
      status: "未対応",
    },
    {
      id: 2,
      name: "Hanako Tanaka",
      email: "hanako@example.com",
      message: "お問い合わせ内容2",
      status: "対応中",
    },
  ]);
  const [selectedInquiry, setSelectedInquiry] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [newInquiry, setNewInquiry] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleEditClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setStatus(inquiry.status);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = () => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === selectedInquiry.id
          ? { ...inquiry, status: status }
          : inquiry
      )
    );
    setSelectedInquiry(null);
  };

  const handleNewInquiryChange = (event) => {
    const { name, value } = event.target;
    setNewInquiry({ ...newInquiry, [name]: value });
  };

  const handleNewInquirySubmit = (event) => {
    event.preventDefault();
    setInquiries([
      ...inquiries,
      { ...newInquiry, id: inquiries.length + 1, status: "未対応" },
    ]);
    setNewInquiry({ name: "", email: "", message: "" });
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#register") {
        document
          .getElementById("register-page")
          .scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (selectedInquiry) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">お問い合わせ編集</h2>
        <div className="mt-4">
          <p className="font-semibold">名前: {selectedInquiry.name}</p>
          <p className="font-semibold">メール: {selectedInquiry.email}</p>
          <p className="font-semibold">
            メッセージ内容: {selectedInquiry.message}
          </p>
          <div className="mt-4">
            <label className="font-semibold" htmlFor="status">
              ステータス
            </label>
            <select
              id="status"
              name="status"
              className="ml-2 p-2 border"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="未対応">未対応</option>
              <option value="対応中">対応中</option>
              <option value="対応済">対応済</option>
            </select>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white font-bold"
            onClick={handleSave}
          >
            保存
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-[300px] bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold">Menu</div>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <a href="#home" className="font-semibold">
              HOME
            </a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="#register" className="font-semibold">
              会員登録
            </a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="#inquiries" className="font-semibold">
              お問い合せ一覧
            </a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="members.html" target="_blank" className="font-semibold">
              会員一覧
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <div id="register-page">
          <h2 className="text-xl font-bold">会員登録</h2>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block font-semibold" htmlFor="username">
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-2 p-2 w-full border"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 p-2 w-full border"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold" htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 p-2 w-full border"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold" htmlFor="confirmPassword">
                パスワード確認
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-2 p-2 w-full border"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white font-bold"
            >
              登録
            </button>
          </form>
        </div>
        <h2 className="text-xl font-bold mt-8">お問い合わせ一覧</h2>
        <table className="min-w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">編集</th>
              <th className="border border-gray-300 px-4 py-2">ステータス</th>
              <th className="border border-gray-300 px-4 py-2">名前</th>
              <th className="border border-gray-300 px-4 py-2">メール</th>
              <th className="border border-gray-300 px-4 py-2">
                メッセージ内容
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white font-bold"
                    onClick={() => handleEditClick(inquiry)}
                  >
                    編集
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <select
                    name="status"
                    className="p-2 border"
                    value={inquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setInquiries(
                        inquiries.map((i) =>
                          i.id === inquiry.id ? { ...i, status: newStatus } : i
                        )
                      );
                    }}
                  >
                    <option value="未対応">未対応</option>
                    <option value="対応中">対応中</option>
                    <option value="対応済">対応済</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {inquiry.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {inquiry.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {inquiry.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-bold mt-8">新規お問い合わせを投稿する</h2>
        <form onSubmit={handleNewInquirySubmit} className="mt-4">
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="name">
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 p-2 w-full border"
              value={newInquiry.name}
              onChange={handleNewInquiryChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="email">
              メール
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-2 w-full border"
              value={newInquiry.email}
              onChange={handleNewInquiryChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="message">
              メッセージ内容
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-2 p-2 w-full border"
              value={newInquiry.message}
              onChange={handleNewInquiryChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white font-bold"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;