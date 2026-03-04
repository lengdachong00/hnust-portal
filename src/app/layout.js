import "./globals.css";

export const metadata = {
  title: "跑材料 | 湖南科技大学信息学院办事指南",
  description: "全方位、分步骤的科大校园办事攻略",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
