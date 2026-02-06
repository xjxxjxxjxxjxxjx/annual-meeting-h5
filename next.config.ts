import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 暂时注释掉 output: 'export'，以便开发服务器正常运行
  // output: 'export',
};

export default nextConfig;
