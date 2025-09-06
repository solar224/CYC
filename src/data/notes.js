// src/data/notes.js
// 依分區：school-curriculum / coding-practice / other-practice
export const NOTES = [
  // *******************************************************************
  {
    id: "n-114-grad-csie",
    slug: "114-csie-grad-admission",
    title: "114 資工研究所推甄",
    date: "2024-11-03",
    category: "other-practice",
    tags: ["推甄", "資工", "研究所", "面試", "備審", "心得", "升學"],
    cover: `${process.env.PUBLIC_URL}/coding.gif`,
    summary:
      "完整整理 114 年資工所推甄經驗：背景成績、競賽與獎項、各校名額/報名數與錄取率、113/114 報名變化與結果、各校書審重點、中央面試流程與 Q&A、踩雷與整體結論，並附參考連結。",
    content: `
# 114 資工研究所推甄

> 本文為 114 年度資工所推甄全紀錄與心得，包括背景、各校書審重點、面試流程與提問、踩雷清單、以及最終總結。  
> 原文出處：[Notion cyc](https://www.notion.so/114-11cc0d33e7e5809db939f35622584160)

---

## 🔴 背景

國立高雄科技大學 [電腦與通訊工程系](https://www.bing.com/ck/a?!&&p=437fd80a22874e32cdf6524a273f15275e26cc751df24d5ed74857e0bba81e67JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e9%ab%98%e7%a7%91%e9%9b%bb%e9%80%9a%e7%b3%bb&u=a1aHR0cHM6Ly9jY2VlLm5rdXN0LmVkdS50dy8&ntb=1)

### 在校成績

| 項目 | 成績 |
| --- | --- |
| 班排名 | 3%（2/58） |
| 系排名 | 5%（6/116） |
| 學業總平均 | 91.81 |
| 書卷獎 | 4 |

### 競賽與得獎經歷

| 年度 | 經歷 |
| --- | --- |
| 113 | [**資訊應用服務創新競賽**](https://www.bing.com/ck/a?!&&p=1bf865a6940f3618a9ecf70df34d1b3841f8469244d12d9b2edc8ab7322205fcJmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e8%b3%87%e6%9c%8d%e7%ab%b6%e8%b3%bd&u=a1aHR0cHM6Ly9pbm5vc2VydmUudGNhLm9yZy50dy8&ntb=1) 教育 AI 組佳作、AI 工具應用組第二名 |
| 113 | 通過 [**國家科學及技術委員會大專學生研究計畫**](https://www.bing.com/ck/a?!&&p=f6220b845d29749ccfacb51f92b26671436bc10ccbaac3007082a2af77ef4759JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e5%9c%8b%e7%a7%91%e6%9c%83%e5%a4%a7%e5%b0%88%e7%94%9f%e7%a0%94%e7%a9%b6%e8%a8%88%e7%95%ab&u=a1aHR0cHM6Ly93d3cubnN0Yy5nb3YudHcvZm9sa3Nvbm9teS9saXN0LzJhZjlhZDlhLTFmNDctNDUwZC1iNWExLTJjYjQzZGU4MjkwYz92aWV3TW9kZT1saXN0VmlldyZsPWNo&ntb=1) |
| 113 | [**國立高雄科技大學電機與資訊學院**](https://www.bing.com/ck/a?!&&p=8d1dbefb0902660b8341ed8ef8c1bcd28f1d7f51f2800db054b62ab12d904282JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e9%ab%98%e7%a7%91%e5%a4%a7%e9%9b%bb%e8%b3%87%e5%ad%b8%e9%99%a2&u=a1aHR0cHM6Ly9jZWVjcy5ua3VzdC5lZHUudHcv&ntb=1) 專題特優 |
| 113 | 全國科技大專校院程式競賽 銅獎 |
| 113 | 電腦與通訊工程系 專題第二名 |
| 113 | 大專生暑期工讀 熱心服務獎 |
| 113 | 國立高雄科技大學 校園創意發想競賽 優等 |
| 113 | 文向教育基金會 獎學金 |
| 112 | 全國科技大專校院程式競賽 銀獎 |
| 112 | [教育大數據分析競賽](https://www.bing.com/ck/a?!&&p=9b5609a513d215ed45092ff7e531d93ab91c3372538bd7b728eb3c409b457756JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e6%95%99%e8%82%b2%e5%a4%a7%e6%95%b8%e6%93%9a%e7%ab%b6%e8%b3%bd&u=a1aHR0cHM6Ly9wYWRzLm1vZS5lZHUudHcvcGFkc19mcm9udC9pbmRleC5waHA_YWN0aW9uPXBhZ2VzMS1uZXctY29tcGV0aXRpb24&ntb=1) 決賽 |
| 112 | 校內教學助理 表現優異獎 |
| 112 | [ICPC 國際大學生程式競賽](https://www.bing.com/ck/a?!&&p=4ca7372abd32ab431d0af3debf72ea61d69909d6287dbd5649d5b877f0b55aa7JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=icpc&u=a1aHR0cHM6Ly9pY3BjLmdsb2JhbC8&ntb=1) |
| 112 | [大學生程式能力檢定（CPE）](https://www.bing.com/ck/a?!&&p=7c10a3516ea6fcc29442bee6506f4e76ec2566d52bbf1aa72fd2b3617f6380a2JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=CPE&u=a1aHR0cHM6Ly9jcGUuY3NlLm5zeXN1LmVkdS50dy8&ntb=1) 四題 |
| 112 | 文向教育基金會 獎學金 |

---

## 🟠 推甄系所

| 學校 | 系所 | 招收人數 | 報名人數 | 錄取率 |
| --- | --- | ---: | ---: | ---: |
| 交大 | 電信甲組 | 45 | 344 | 13.08% |
| 交大 | 數據 | 39 | 484 | 8.05% |
| 成大 | 資工甲 | 87 | 629 | 13.83% |
| 交大 | 智能（聯招） | 甲15 / 乙5 / 丙9 / 丁11 | 610 | 6.55% |
| 中央 | 資工 | 90 | 596 | 15.10% |
| 交大（台南） | 智慧科學（聯招） | 甲12 / 乙9 / 丙9 | 274 | 10.94% |
| 中山 | 資工 | 54 | 390 | 13.84% |
| 中正 | 資工 | 83 | 541 | 15.34% |

---

## 🟡 113 和 114 報名人數與推甄結果

> 紅色：報名人數**增加** 或 **落榜**。  
> 綠色：報名人數**減少** 或 **上岸**。

| 學校 | 系所 | 114 報名 | 113 報名 | 一階分數 | 二階分數 | 結果 |
| --- | --- | ---: | ---: | --- | --- | --- |
| 交大 | 電信甲 | **344** | 339 | — | — | **落榜** |
| 交大 | 數據 | **484** | 441 | — | — | **備取 33** |
| 成大 | 資工甲 | **629** | 570 | 39.19 | 一階未通過 | **落榜** |
| 交大 | 智能 | **610** | 443 | — | — | 落榜；備取 144；—；落榜 |
| 中央 | 資工 | 596 | **604** | 85.72 | 87.68 | **備取 61** |
| 交大（台南） | 智慧科學 | **274** | 251 | — | — | 備取 23；備取 14；備取 7 |
| 中山 | 資工 | **390** | 420 | 通過 | 放棄（撞中央） | 進二階，放棄 |
| 中正 | 資工 | **541** | 518 | 89.6 | 放棄面試 | 進二階，放棄 |

---

## 🟢 書審

### 交大

- [數據工程](https://www.bing.com/ck/a?!&&p=525e62ed23e02eee15851d85c75b13ee32e11668fca3eba99d61dde39bf6cecbJmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e4%ba%a4%e5%a4%a7%e6%95%b8%e6%93%9a&u=a1aHR0cHM6Ly93d3cuY3MubnljdS5lZHUudHcvaW50cm8vb3JnYW5pemF0aW9uL2RhdGE&ntb=1)  
  主要到資工所網站填表單；[**陽明交通大學招生網站**](https://www.bing.com/ck/a?!&&p=c974ddd94f12c9b32ab934727fc849f402fc49e97ce269bd1c0a2ce77df290b4JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e4%ba%a4%e5%a4%a7%e7%94%84%e8%a9%a6&u=a1aHR0cHM6Ly9leGFtLm55Y3UuZWR1LnR3Lw&ntb=1) 需填：考生資料表、成績單、在學證明。  
  系所網站需填：在校成績（班/系排、各學期、修課表現）、**專題/競賽/計畫**（PDF＋教授簽名貢獻證明）、**CPE**（證明與評級）。

- [電信甲組](https://www.bing.com/ck/a?!&&p=03f8ef49b08194390239c53dfef839fedf6021a4f51756f283d0fa679e98ad57JmltdHM9MTczMjQwNjQwMA&ptn=3&ver=2&hsh=4&fclid=2747ea49-5889-6096-3d31-fe1c59996115&psq=%e4%ba%a4%e5%a4%a7%e9%9b%bb%e4%bf%a1&u=a1aHR0cHM6Ly9jbS5ueWN1LmVkdS50dy8&ntb=1)  
  系網＋招生網站皆須填。**結論**：連備取無，略。

**結論**：數據所表單欄位多且細，競賽門檻偏高（如 ICPC、積體電路競賽等），**能填盡量填**。

### 成大（資工甲）

- [系網](https://www.csie.ncku.edu.tw/zh-hant/ncku_csie/) 需填 **Google 表單**；[成大招生網站](https://campus4.ncku.edu.tw/wwwmenu/program/net/new/net1/login.php) 獨立繳件。  
- Google 表單：在校成績（班/系排、%）、**資工六科成績**、經歷、**GitHub** 連結。  
- 招生網站：個人審查資料表、成績單、讀書計畫、專題與研究能力、資訊能力證明。  

**結論**：一階約差 1.x 未進面試（當時 **GitHub 欄位未放連結**）。系統會**自動合併**繳交檔案，封面/目錄需特別小心。

### 中央（資工）

- [系網](https://www.csie.ncu.edu.tw/)  
- 一份備審：  
  A. 專題研究報告、B. 學術論文（可免）、C. 研究/讀書計畫與自傳（A+B+C **總字數 ≤ 2000**）。  
- 其他：競賽/活動證明、**兩封線上推薦信**。

**結論**：實際繳交 **> 5000 字** 仍壓線進面試，不確定違反字數是否影響分數。

### 中山（資工）

- [系網](https://cse.nsysu.edu.tw/)  
- 類似成大，**分檔上傳**。  
**結論**：照片需符合規格，模糊會被要求更換。

### 中正（資工）

- [系網](https://cs.ccu.edu.tw/)  
- 印象僅需 **單一檔案**。  
**結論**：系統不支援 PDF **跳頁連結**，上傳會失敗（當時有致電詢問）。

---

## 🔵 面試（中央）

- **官方公告**（PDF）：[公告 - 國立中央大學資訊工程學系.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/d62c8dde-c6c2-4dc2-9637-f498e43cfe2f/6b49e112-dc1e-484c-954e-de79ea1f8c05/%E5%85%AC%E5%91%8A_-_%E5%9C%8B%E7%AB%8B%E4%B8%AD%E5%A4%AE%E5%A4%A7%E5%AD%B8%E8%B3%87%E8%A8%8A%E5%B7%A5%E7%A8%8B%E5%AD%B8%E7%B3%BB.pdf)

**流程**  
- 3 分鐘簡報（PPT 或 PDF）＋ 3 分鐘教授提問。  
- 成功報到後在等候區等待；工作人員按序叫號（**五人一組**），引導至會議室外等候，依序進場。  
- 現場**提供筆電與簡報筆**。  

**面試簡報**（體感約 3 分鐘）  
- 策略：重心放在**經歷**（成績、競賽、專題/計畫），**共 8 頁**。平時演練約 **2:40**。  

**教授提問**（體感約 2 分鐘）  
- **Q（教授 A）**：你的主要表現是 XXX 比賽嗎？為什麼要打 🌟？  
  **A**：原先代表比賽仍在進行，因颱風延期，面試時比賽已結束並獲佳作與第二名（資服競賽）。  
- **Q（教授 B）**：你國科會計畫的資料怎麼來？有與單位合作嗎？  
  **A**：使用高雄某綜合醫院提供的真實數據。  
- **Q（教授 B）**：資料如何表示？  
  **A**：包含手術名稱、麻醉藥物、醫師姓名與年資等欄位，透過……（略），因此能做出符合真實的預測。  
- **Q（教授 C）**：CPE 專業級幾題？  
  **A**：4 題。  

**小結**  
- 面試時間在傍晚，提問偏表面；保持穩定心態與條理清楚的說明即可。  
- 研究與修課計畫**合併一頁**呈現；專題與國科會計畫以**概要**為主。

---

## 🟣 總結

### 推甄期間遇到的幾個問題
- 不熟悉**成大**合併機制 → 出現**多封面/多封底**。  
- 成大資工 **Google 表單**須填 **GitHub**，需提前整理。  
- **中央二階**因颱風延期與**中山二階**撞期，兩者皆在下午，**只能擇一**。  
- **交大智能所**封面圖誤放中央資工系館。  

### 業績重要度（個人體感）
1. **排名**：系排與班排  
2. **資工修課成績**：核心必修不可落  
3. **計畫與專案**：政府計畫、企業/產學合作  
4. **程式檢定/比賽**：CPE、ICPC、Codeforces、LeetCode  

**結論**：**排名 > 修課成績 > 計畫專案 ≥ 程式檢定 ≥ 其他**（助教、校內獎等）。

---

## ⚫ 附錄（參考文獻）
- [資工推甄結果串](https://csie-apply-result.de.r.appspot.com/)  
- [[心得] 111年度 資工所推甄 - HackMD](https://hackmd.io/@BeNordic/rk6XEtjDY)  
- [112 研究所推甄心得 - HackMD](https://hackmd.io/@j1v4rpJsSuu3wxkb-2W5Fg/H1KUGQiLo)  
- [113 年資工所推甄心得 - HackMD](https://hackmd.io/@daaaaaaaavid/H1rwo6Kw6)  
- [114 資工所推甄心得分享 - HackMD](https://hackmd.io/@pinhsiu92/HJQkYvWsq)  
- [[研究所推甄心得] 2022 資工所 - Medium](https://medium.com/@ycpin/%E5%BF%83%E5%BE%97-2022-%E8%B3%87%E5%B7%A5%E6%89%80%E6%8E%A8%E7%94%84-51f93baa3244)  
- [[研究所推甄] 資工所推甄心得1 - MeetonFriday](https://meetonfriday.com/posts/44bbe391/)  
- [[心得] 111 資工所推甄心得 - PTT](https://www.ptt.cc/bbs/graduate/M.1641911922.A.05E.html)
`
  },
  // *******************************************************************
  {
  id: "n-nycu-dl-2025",
  slug: "nycu-deep-learning-2025",
  title: "NYCU Deep Learning (Summer 2025)",
  date: "2025-07-01",
  category: "school-curriculum",            
  cover: `${process.env.PUBLIC_URL}/DL.png`,
  tags: ["Deep Learning","NYCU","Course","Labs","Reinforcement Learning","Diffusion"],
  // cover 可留空，沒有就會走你卡片的漸層預設
  summary:
    "NYCU 資工暑期 Deep Learning 課程：主題、評分、時程、參考書與實作倉庫。含 Labs、論文報告與期末專題。",
  content: `
# NYCU Deep Learning (Summer 2025)
> National Yang Ming Chiao Tung University — Department of Computer Science

**GitHub Repo**：<https://github.com/solar224/NYCU_DL>

[![Course](https://img.shields.io/badge/Course-Deep%20Learning-blue)]()
[![Semester](https://img.shields.io/badge/Semester-Summer%202025-informational)]()
[![Language](https://img.shields.io/badge/Language-English-lightgrey)]()

---

## Table of Contents
- [Overview](#課程簡介-overview)
- [Instructors](#授課教師與助教-instructors--tas)
- [Grading](#評分方式-grading)
- [Schedule](#時程與主題-schedule)
- [Textbooks & References](#教材與參考-textbooks--references)
- [Repo Structure](#專案倉庫建議結構-suggested-repo-structure)

---

## 課程簡介
本課程兼顧 **理論** 與 **實作**，內容涵蓋：
- 深層前饋網路、CNN、RNN/Recursive nets  
- Autoencoders、Linear factor models、GANs、Normalizing flows、Diffusion  
- 強化學習（值函數、政策、模型式）  
- 期末以**論文風格**發表專題

---

## 授課教師
- 彭文孝（Peng）｜wpeng@cs.nctu.edu.tw  
- 陳永昇（Chen）｜yschen@nycu.edu.tw  
- 謝秉均（Hsieh）｜pinghsieh@cs.nycu.edu.tw  

---

## 評分方式 
**Part I（3 學分）Deep Learning**
- 4 Labs（Lab 0、2、5、6；個別完成）80%
- 期末考 20%

**Part II（3 學分）Deep Learning & Practice**
- 4 Labs（Lab 1、3、4、7）50%
- 論文報告（3 人一組）25%
- 期末專題（3 人一組）25%

---

## 時程與主題
> Afternoon 為下午課；Evening 為晚間實作／實驗課。Dates in **2025/7–8**.

| Date | Afternoon Topic                           | Evening / Lab                     |
|-----:|-------------------------------------------|-----------------------------------|
| 7/1  | Introduction & ML Basics                  | Warm-up (**Lab 0**)               |
| 7/3  | Deep Feedforward Networks                 | Back-Propagation (**Lab 1**)      |
| 7/8  | Convolutional Networks                    | ConvNets & Transformers (**Lab 2**) |
| 7/10 | Introduction to Reinforcement Learning    | No class                          |
| 7/15 | Recurrent & Recursive Nets                | MaskGIT (**Lab 3**)               |
| 7/17 | Linear Factor Models, Autoencoders        | No class                          |
| 7/22 | Generative Adversarial Networks           | CVAE (**Lab 4**)                  |
| 7/24 | Value-Based Reinforcement Learning        | No class                          |
| 7/29 | Policy-Based Reinforcement Learning       | Discrete Control (**Lab 5**)      |
| 7/31 | Diffusion Models                          | No class                          |
| 8/5  | Normalizing Flows                         | Diffusion (**Lab 6**)             |
| 8/7  | Final Project Proposal                    | Final Project Proposal            |
| 8/12 | Model-Based Reinforcement Learning        | Continuous Control (**Lab 7**)    |
| 8/14 | No class                                  | No class                          |
| 8/19 | Paper Presentation                        | Paper Presentation                |
| 8/21 | Paper Presentation                        | Paper Presentation                |
| 8/26 | Final Exam                                | —                                 |
| 8/28 | Final Project Demo                        | —                                 |

---

## 教材與參考
- I. Goodfellow, Y. Bengio, A. Courville, *Deep Learning*, MIT Press, 2016.  
- R. S. Sutton, A. G. Barto, *Reinforcement Learning: An Introduction*, 2020.  
- 課程材料約自編與既有教材各佔 50%（for reference only）

---

## 專案倉庫結構
    .
    ├── labs/
    │   ├── lab0_warmup/
    │   ├── lab1_backprop/
    │   ├── lab2_conv_transformers/
    │   ├── lab3_maskgit/
    │   ├── lab4_cvae/
    │   ├── lab5_discrete_rl/
    │   ├── lab6_diffusion/
    │   └── lab7_continuous_rl/
    ├── paper_presentation/
    │   ├── slides/
    │   └── report/
    ├── final_project/
    │   ├── proposal/
    │   ├── code/
    │   └── paper/
    ├── docs/              # notes, additional references
    ├── .gitignore
    └── README.md
`
},
// *******************************************************************
{
    id: "n-free5gc-lab0",
    slug: "free5gc-lab0-network-programming-basics",
    title: "free5GC Lab0：網路程式設計的基礎（Go/TCP Echo）",
    date: "2025-09-06",
    category: "school-curriculum",
    tags: ["free5GC", "5G", "Networking", "Go", "TCP", "Goroutine", "Lab0"],
    cover: `${process.env.PUBLIC_URL}/free5gc.png`, // 有圖就打開；沒圖可留空走預設
    summary:
      "用 Go 的 net 套件實作 TCP Echo 伺服器：Client-Server 模型、goroutine 併發、資源釋放與 go test/-race 驗證，支援多連線與正確回應。",
    content: `
# free5GC Lab

GitHub Repo：[free5GLab](https://github.com/free5gc/free5GLabs)

# Lab0 網路程式設計的基礎

### **1. 實驗目標**

- 理解網路程式設計的基本模型 (Client-Server)。
- 學習使用 Go 的 \`net\` 套件來建立一個 TCP 伺服器。
- 掌握使用 Goroutine (\`go\` 關鍵字) 實現併發處理客戶端連線的方法。
- 學會使用 \`go test\` 指令來對網路程式進行自動化測試。

### **2. 核心知識點**

- **TCP/IP**:
    - **IP (\`0.0.0.0\` vs \`127.0.0.1\`)**:
    
    \`127.0.0.1\` (localhost) 指的是本機，只有本機上的程式可以連線。
    
    \`0.0.0.0\` 代表監聽本機上所有的網路介面，讓其他電腦也可以透過區域網路連線進來。
    
    - **TCP**: 一種**連線導向**、**可靠的**傳輸協議。在傳輸資料前必須先建立連線 (三次握手)，能保證資料依序、無錯誤地送達。
- **Go 網路程式設計關鍵函式**:
    - \`net.Listen(network, address)\`: 建立一個伺服器監聽器。
    - \`listener.Accept()\`: 等待並接受一個新的客戶端連線，回傳 \`net.Conn\` 物件。
    - \`conn.Read(b []byte)\` / \`conn.Write(b []byte)\`: 從連線中讀取/寫入位元組資料。
    - \`bufio.NewReader(conn).ReadString('\\n')\`: 一個方便的輔助函式，可以讀取直到特定分隔符的字串。
    - \`defer\`: 用於確保資源 (如網路連線 \`net.Conn\` 或監聽器 \`net.Listener\`) 在函式結束時被正確關閉。
- **Go 併發 (Concurrency)**:
    - **Goroutine**: Go 語言實現併發的核心。使用 \`go\` 關鍵字可以非常輕易地啟動一個併發執行的函式。在本例中，\`go handler(conn)\` 讓我們的主迴圈不必等待客戶端處理完畢，從而實現高併發。

### **3. 程式碼架構**

- **\`TCPListener\` (監聽者)**:
    1. **綁定** IP 和 Port (\`net.Listen\`)。
    2. 進入**無限迴圈**。
    3. 在迴圈中**等待**新的連線 (\`server.Accept\`)。
    4. 每當有新連線進來，就**啟動一個新的 Goroutine** (\`go TCPHandler\`) 將連線交給它處理。
- **\`TCPHandler\` (處理者)**:
    1. 接收一個 \`net.Conn\` 物件作為參數。
    2. 進入**無限迴圈**來持續服務這個客戶端。
    3. 在迴圈中**讀取**客戶端傳來的資料 (\`ReadString\`)。
    4. 將讀到的資料**寫回**給客戶端 (\`Write\`)。
    5. 如果讀寫出錯 (如客戶端斷線)，則結束迴圈並**關閉連線**。

### **4. 驗證方法**

- 使用 \`make test\` 命令，它會執行 \`go test\`。
- 測試腳本會模擬多個客戶端同時連線到你的伺服器，並發送訊息，然後檢查伺服器的回應是否正確。
- 看到 \`PASS\` 和 \`ok\` 即代表實驗成功。

### 5. 實現 \`TcpListener()\` 和 \`TcpHandler()\` 這兩個函式，並滿足以下行為：

- **同時處理多個連線**：伺服器不能因為服務一個客戶端就卡住，必須能同時接受新的客戶端連線。
- **回應收到的訊息**：伺服器要把從客戶端收到的任何訊息，原封不動地送回去。這通常被稱為 "Echo Server"。

解析 \`tcp.go\` 程式碼

\`TCPListener\` 函式:
負責**監聽**指定的 IP 和 port，並**接受**新的客戶端連線。

\`\`\`go
func TCPListener(host string, port int, handler handlerInterface) {
    // 1. 建立監聽器 (Listener)
    // net.Listen("tcp", ...) 會在指定的 host 和 port 上開始監聽 TCP 連線。
    // 如果成功，它會回傳一個 listener 物件；如果失敗 (例如 port 已被佔用)，則回傳 error。
    server, err := net.Listen("tcp", fmt.Sprintf("%s:%d", host, port))
    if err != nil {
        log.Fatalf("Server can't listening on port %d: %v", port, err)
    }
    // 2. 確保函式結束時關閉監聽器
    // defer server.Close() 它保證不論函式如何結束，
    // server.Close() 都會被執行，確保資源被釋放。
    defer server.Close()

    log.Printf("TCP is listening on %s:%d", host, port)

    // 3. 無窮迴圈，持續接受新連線
    for {
        // server.Accept() 會在這裡「卡住」(block)，直到有一個新的客戶端連線進來。
        // 連線成功後，它會回傳一個代表這個連線的 conn 物件。
        conn, err := server.Accept()
        if err != nil {
            log.Fatalf("Accept failed: %v", err)
        }

        log.Printf("new client accepted: %s", conn.RemoteAddr().String())
        
        // 4. 關鍵！併發處理連線
        // 這裡就是「支援同時處理多個連線」的魔法所在！
        // \`go handler(conn)\` 會啟動一個新的 goroutine (可以想成是一個輕量級的執行緒)。
        // 這讓主迴圈不用等待 \`handler\` 處理完畢，可以立刻回去繼續執行 \`server.Accept()\`，
        // 等待下一個客戶端連線。
        go handler(conn)
    }
}
\`\`\`

\`TCPHandler\` 函式:
這個函式負責處理**單一**的客戶端連線。

\`\`\`go
func TCPHandler(conn net.Conn) {
    // 1. 確保函式結束時關閉連線
    // 與 listener 一樣，確保與這個客戶端的連線最終會被關閉。
    defer conn.Close()
    clientAddr := conn.RemoteAddr().String()
    log.Printf("Handle Request from [%s]", clientAddr)

    // 2. 無窮迴圈，持續處理來自此客戶端的訊息
    for {
        // 3. 讀取資料
        // bufio.NewReader(conn).ReadString('\\n') 會從連線中讀取資料，
        // 直到讀到換行符號 \`\\n\` 為止。
        data, err := bufio.NewReader(conn).ReadString('\\n')
        if err != nil {
            // 如果讀取時發生錯誤 (例如客戶端斷線了，會收到 EOF 錯誤)，
            // 就印出 log 並結束這個 handler。
            log.Printf("Client [%s] Error: %v", clientAddr, err)
            return
        }
        
        // 4. 回傳資料 (Echo)
        // conn.Write([]byte(data)) 將剛剛收到的資料轉換成 byte 陣列，
        // 然後再寫回給同一個客戶端，完成「Echo」的任務。
        _, err = conn.Write([]byte(data))
        if err != nil {
            log.Printf("Reply to Client [%s] failed: %v", clientAddr, err)
            return
        }
    }
}
\`\`\`

已經理解了程式碼，\`README.md\` 和 \`Makefile\` 告訴我該如何驗證它。

- **開啟你的終端機 (Terminal)**。
- **切換到 Lab 0 的專案目錄下**。
- **執行命令**：

\`\`\`go
go test -v -race -timeout 30s ./...
\`\`\`

結果:

\`\`\`go
PS D:\\Labs\\free5GLabs\\Lab0> go test -v -race -timeout 30s ./...
=== RUN   TestTcpFunction
2025/09/06 18:51:32 TCP is listening on 127.0.0.1:8080
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52396
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52396]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52397
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52397]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52398
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52398]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52399
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52399]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52400
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52400]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52401
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52401]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52402
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52402]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52403
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52403]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52404
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52404]
2025/09/06 18:51:37 new client accepted: 127.0.0.1:52405
2025/09/06 18:51:37 Handle Request from [127.0.0.1:52405]
--- PASS: TestTcpFunction (5.01s)
PASS
2025/09/06 18:51:37 Client [127.0.0.1:52402] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52400] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52401] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52399] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52398] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52397] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52396] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52404] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52405] Error: EOF
2025/09/06 18:51:37 Client [127.0.0.1:52403] Error: EOF
ok      github.com/ianchen0119/free5GLab/lab0   8.371s
?       github.com/ianchen0119/free5GLab/lab0/ans       [no test files]
\`\`\`

---

## 補充｜實務注意事項（可之後逐步擴充）
- **黏包/拆包**：若改為 \`Read\`/自訂協議，務必處理訊框邊界（長度前綴、分隔符、或使用 \`bufio.Scanner\` 自訂 Split）。  
- **逾時/存活**：為避免連線掛住，加上 \`conn.SetReadDeadline\` / \`SetWriteDeadline\` 或 idle timeout。  
- **優雅關閉**：用 \`context\` + \`server.Close()\` 終止 accept 迴圈，並追蹤 goroutines 等待收斂。  
- **-race 的意義**：資料競賽偵測器對併發程式很有幫助，測試時保持開啟。  
- **0.0.0.0 與 127.0.0.1**：本地測試用 \`127.0.0.1\`；若要被其他主機連到請改 \`0.0.0.0\` 並注意防火牆/安全性。  
- **壓測**：可用 \`hey\`、\`wrk\` 或自寫 goroutines 客戶端做多連線壓力測試，觀察 CPU/記憶體與 accept/handler 行為。
`
  },
    // *******************************************************************

  {
    id: "n-free5gc-lab1",
    slug: "free5gc-lab1-concurrent-programming-go",
    title: "free5GC Lab1：併發程式設計 (Concurrent Programming)",
    date: "2025-09-06",
    category: "school-curriculum",
    cover: `${process.env.PUBLIC_URL}/free5gc.png`,
    tags: [
      "free5GC","5G","Networking","Go","Goroutine","Channel","Mutex","Atomic",
      "Select","WaitGroup","Context","Concurrency","Lab1","NYCU"
    ],
    summary:
      "Go 併發程式設計入門：Goroutine、Channel（含無/有緩衝、單向通道）、Select、Atomic、Mutex、自旋鎖、WaitGroup、Context 取消/超時。含實作陷阱、修正與補充實務建議。",
    content: [
      "# Lab1 **併發程式設計 (Concurrent Programming)**",
      "",
      "**GitHub Repo**：[free5GLab](https://github.com/free5gc/free5GLabs)",
      "",
      "## 什麼是併發 (Concurrency)？",
      "",
      "併發是指**處理**多個任務的能力，但不一定**同時執行**。想像一個廚師，他一下切菜、一下看火、一下調味。他雖然只有一個人，卻能讓多道菜的進度同時推進，這就是併發。Go 語言透過 **Goroutine** 和 **Channel** 讓併發程式設計變得非常簡單。",
      "",
      "## Race Condition & Critical Section (競爭條件與臨界區)",
      "",
      "兩個或多個 Goroutine 同時存取一個共享資源（例如一個變數），且至少有一個會修改它時，就會發生 **Race Condition**。這會導致結果不可預測，就像兩個 人同時搶著修改同一份文件，最後的內容可能會亂七八糟。",
      "",
      "- **Critical Section (臨界區)**：就是那段存取共享資源的程式碼。在範例中，`counter++` 就是臨界區。",
      "- **如何解決**：我們需要一種機制來確保一次只有一個 Goroutine 能進入臨界區，這就是**同步 (Synchronization)**，下面介紹的 `Atomic`、`Mutex` 等都是實現同步的方法。",
      "",
      "### Goroutine：輕量級執行緒",
      "",
      "Goroutine 是 Go 語言實現併發的核心。你可以把它想像成一個非常輕量、啟動成本極低的「小任務」。在函式呼叫前加上 `go` 關鍵字，就能為這個函式建立一個新的 Goroutine。",
      "",
      "```go",
      "// 程式會立刻往下執行，不會等待 Goroutine 結束",
      "go func() {",
      '    fmt.Println("Hello from another Goroutine!")',
      "}()",
      "",
      "// 主程式需要等待一下，否則可能在 Goroutine 執行前就結束了",
      "time.Sleep(1 * time.Second)",
      "```",
      "",
      "### Atomic Operations (原子操作)",
      "",
      "**原子操作**是指一個「不可分割」的操作。在併發環境下，它可以保證在執行過程中不會被其他 Goroutine 中斷。這就像一個單一的 CPU 指令，執行就是一瞬間完成。",
      "",
      "對於簡單的計數器操作，使用 `sync/atomic` 套件會比使用 `Mutex` 更有效率。",
      "",
      "```go",
      'import "sync/atomic"',
      "",
      "var counter int32",
      "// 安全地將 counter 加 1",
      "atomic.AddInt32(&counter, 1)",
      "```",
      "",
      "### 同步工具：SpinLock vs. Mutex",
      "",
      "這兩者都是用來保護**臨界區**的鎖。",
      "",
      "- **SpinLock (自旋鎖)**：",
      "    - **原理**：當一個 Goroutine 想要取得鎖，但鎖已被佔用時，它會進入一個「忙碌等待」的迴圈 (spin)，不斷檢查鎖是否被釋放。",
      "    - **優點**：反應快，一旦鎖被釋放能立刻取得。",
      "    - **缺點**：在等待時會持續消耗 CPU 資源。",
      "    - **適用場景**：鎖被佔用的時間非常短的場合。",
      "- **Mutex (互斥鎖)**：",
      "    - **原理**：當一個 Goroutine 想要取得鎖，但鎖已被佔用時，Go 的排程器會讓這個 Goroutine **進入休眠**，把 CPU 資源讓給其他任務。當鎖被釋放時，排程器會再喚醒它。",
      "    - **優點**：等待時不消耗 CPU。",
      "    - **缺點**：休眠和喚醒有一定的系統開銷。",
      "    - **適用場景**：大多數情況下的首選，Go 內建的 `sync.Mutex` 非常高效。",
      "",
      "```go",
      'import "sync"',
      "",
      "var counter int",
      "var mu sync.Mutex",
      "",
      "// 保護臨界區",
      "mu.Lock()",
      "counter++",
      "mu.Unlock()",
      "```",
      "",
      "### Channel：Goroutine 之間的溝通管道",
      "",
      "Go 提倡「**不要透過共享記憶體來溝通，而要透過溝通來共享記憶體**」。Channel 就是實現這個理念的工具。你可以把它想像成一個安全的「傳送帶」。",
      "",
      "- **Unbuffered Channel (無緩衝通道)**：",
      "    - `ch := make(chan int)`",
      "    - 容量為 0。傳送方 (`ch <- data`) 會被**阻塞**，直到接收方 (`<-ch`) 準備好接收。反之亦然。這是一種強力的**同步**機制。",
      "- **Buffered Channel (有緩衝通道)**：",
      "    - `ch := make(chan int, 10)`",
      "    - 容量大於 0。只要緩衝區沒滿，傳送方就可以立刻傳送資料而不會被阻塞。只要緩衝區不為空，接收方就可以立刻接收資料。",
      "- **Unidirectional Channel (單向通道)**：",
      "    - `chan<- int`: 只能傳送 (send-only)。",
      "    - `<-chan int`: 只能接收 (receive-only)。",
      "    - 這能讓函式的介面更安全，防止誤用。",
      "",
      "### Select：多路通道監聽器",
      "",
      "`select` 陳述式可以讓你同時等待多個 Channel 操作。它會**阻塞**，直到其中一個 `case` 的 Channel 操作可以進行（可以傳送或接收），然後執行該 `case`。如果有多個 `case` 同時就緒，它會**隨機選擇一個**執行。",
      "",
      "```go",
      "select {",
      "case msg1 := <-ch1:",
      '    fmt.Println("received", msg1)',
      "case ch2 <- msg2:",
      '    fmt.Println("sent", msg2)',
      "case <-time.After(1 * time.Second): // 超時機制",
      '    fmt.Println("timeout")',
      "default: // 如果沒有任何 case 就緒，會執行 default",
      '    fmt.Println("no communication")',
      "}",
      "```",
      "",
      "### WaitGroup：等待一群 Goroutine 完成",
      "",
      "`sync.WaitGroup` 用於等待一組 Goroutine 全部執行完畢。它內部維護一個計數器。",
      "",
      "- `wg.Add(n)`：計數器加 n。通常在啟動 Goroutine 前呼叫。",
      "- `wg.Done()`：計數器減 1。通常在 Goroutine 結束時使用 `defer` 呼叫。",
      "- `wg.Wait()`：阻塞主程式，直到計數器歸零。",
      "",
      "```go",
      "var wg sync.WaitGroup",
      "for i := 0; i < 5; i++ {",
      "    wg.Add(1) // 計數器加 1",
      "    go func(num int) {",
      "        defer wg.Done() // 函式結束時計數器減 1",
      '        fmt.Printf("Worker %d done\\n", num)',
      "    }(i)",
      "}",
      "wg.Wait() // 等待所有 worker 完成",
      'fmt.Println("All workers done")',
      "```",
      "",
      "### Context：控制 Goroutine 的生命週期",
      "",
      "`context` 套件提供了一種跨越多個 Goroutine 傳遞**截止時間 (deadline)**、**取消信號 (cancellation signal)** 和其他請求範圍值的方法。",
      "",
      "如上圖所示，當一個請求進來時，你可能會啟動多個 `Worker`，而每個 `Worker` 又可能啟動多個 `Job`。如果這個請求被使用者取消了，我們希望能有一種方法可以**通知所有**相關的 Goroutine 停止工作，以釋放資源。這就是 `Context` 的主要用途。",
      "",
      "- `context.Background()`：通常是所有 Context tree 的根。",
      "- `context.WithCancel(parent)`：創建一個可以被手動取消的 Context。",
      "- 在 Goroutine 中，使用 `select` 監聽 `ctx.Done()` channel。一旦 Context 被取消，這個 channel 就會被關閉，Goroutine 就可以執行清理工作並退出。",
      "",
      "```go",
      "func worker(ctx context.Context, name string) {",
      "    for {",
      "        select {",
      "        case <-ctx.Done(): // Context 被取消了",
      '            fmt.Println(name, "is stopping...")',
      "            return }",
      "        default:",
      '            fmt.Println(name, "is working...")',
      "            time.Sleep(1 * time.Second)",
      "        }",
      "    }",
      "}",
      "",
      "func main() {",
      "    // 創建一個可以取消的 context",
      "    ctx, cancel := context.WithCancel(context.Background())",
      "",
      '    go worker(ctx, "Worker1")',
      '    go worker(ctx, "Worker2")',
      "",
      "    time.Sleep(3 * time.Second)",
      '    fmt.Println("Main: issuing cancellation")',
      "    cancel() // 發出取消信號",
      "    time.Sleep(1 * time.Second) // 等待 worker 退出",
      "}",
      "```",
      "",
      "## 練習題解析",
      "",
      "這裡將 `Answer.md` 的內容與問題結合，並提供更詳細的說明。",
      "",
      "- **什麼是原子操作 (atomic operation)？**",
      "    - **答案**：原子操作是一個相對於其他執行緒或進程來說，在單一步驟內完成的低階操作。它通常由硬體的 CPU 指令直接支援，保證操作的完整性，不會被中斷。",
      "- **下面的範例有併發問題嗎？為什麼？**",
      "",
      "```go",
      "var a int64",
      "func main() {",
      "    var wg sync.WaitGroup",
      "    wg.Add(1)",
      "",
      "    go func() {",
      "        increment()",
      "        wg.Done()",
      "    }()",
      "    wg.Wait()",
      '    fmt.Println("Final value of a:", a)',
      "}",
      "func increment() {",
      "    for i := 0; i < 100000000; i++ {",
      "        go func() {",
      "             a = a + 1",
      "        }()",
      "    }",
      "}",
      "```",
      "",
      "- **答案**：**有嚴重的併發問題**。",
      "- **原因**：`a = a + 1` 這個操作不是原子的。它實際上包含三個步驟：1. 讀取 `a` 的值到暫存器。2. 將暫存器的值加 1。3. 將新值寫回 `a`。當大量 Goroutine 同時執行這三步時，會互相覆蓋結果，導致最終的 `a` 遠小於預期值。這就是典型的 **Race Condition**。",
      "- **修正**：應使用 `atomic.AddInt64(&a, 1)` 來保證計數操作的原子性。",
      "- **`wg.Add(1)` 和 `wg.Done()` 是做什麼的？`1` 代表什麼？**",
      "    - **答案**：",
      "        - `wg.Add(1)`：告訴 `WaitGroup` 的計數器「有一個新的任務需要等待」，計數器加 1。",
      "        - `wg.Done()`：告訴 `WaitGroup` 的計數器「有一個任務完成了」，計數器減 1。",
      "        - `1` 代表要增加到等待計數器中的 Goroutine 數量。",
      "- **請定義一個包含整數欄位和 `sync.Mutex` 的 `Counter` 結構，並實作一個安全遞增計數器的函式。**",
      "    - **答案**：",
      "",
      "```go",
      'import "sync"',
      "",
      "// Counter 結構包含一個互斥鎖和一個值",
      "type Counter struct {",
      "    mu    sync.Mutex",
      "    value int",
      "}",
      "",
      "// Increment 函式安全地將計數器加一",
      "func (c *Counter) Increment() {",
      "    c.mu.Lock()   // 在修改 value 前鎖定",
      "    defer c.mu.Unlock() // 確保函式結束時解鎖",
      "    c.value++",
      "}",
      "```",
      "",
      "- 為什麼下面的程式碼會出現致命錯誤？",
      "",
      "```go",
      "func main() {",
      "    var intChan chan int",
      "    fmt.Println(intChan)",
      "    intChan <- 10",
      "}",
      "```",
      "",
      "- **答案**：因為 `var intChan chan int` 只是宣告了一個 Channel 變數，它的初始值是 `nil`。你必須使用 `make` 來初始化並分配記憶體空間，例如 `intChan := make(chan int)`。對一個 `nil` channel 進行傳送或接收操作會導致所有 Goroutine 永久阻塞，引發 `deadlock` 錯誤。",
      "- 在 `Select` 的超時機制範例中，使用 `time.After` 可能有潛在的記憶體洩漏問題。請描述原因並修正。",
      "    - **原因**：`time.After(d)` 函式會立即回傳一個 channel，並在底層啟動一個新的 Goroutine，這個 Goroutine 會在等待時間 `d` 過後向該 channel 發送當前時間。如果在 `select` 陳述式中，是其他 `case` 先被觸發而退出了 `select`，那麼 `time.After` 創建的那個底層 Goroutine 和 channel 就永遠沒有機會被讀取，它們的資源直到計時器到期前都無法被垃圾回收 (GC)。如果在一個迴圈中頻繁使用這種模式，就會累積大量的洩漏資源。",
      "    - **修正**：更好的作法是使用 `time.NewTimer`。`Timer` 物件可以被明確地停止 (`timer.Stop()`)，從而提前釋放相關資源。",
      "",
      "```go",
      "// 修正後的程式碼",
      "func main() {",
      "    timeout := make(chan bool, 1)",
      "    go func() {",
      "        time.Sleep(1 * time.Second)",
      "        timeout <- true",
      "    }()",
      "    ch := make(chan int)",
      "",
      "    timer := time.NewTimer(time.Second * 2)",
      "    // 確保 timer 的資源在函式結束時被釋放",
      "    defer timer.Stop()",
      "",
      "    select {",
      "    case <-ch:",
      "    case <-timeout:",
      '        fmt.Println("Open5GS")',
      "    case <-timer.C: // 使用 timer.C 作為 channel",
      '        fmt.Println("free5GC")',
      "    }",
      "}",
      "```",
      "",
      "---",
      "",
      "## 補充與實務建議",
      "",
      "1. **資料競爭偵測**：",
      "   - 使用 `go test -race` 或 `go run -race` 偵測 data race，能提早抓到讀寫衝突。",
      "",
      "2. **Go 記憶體模型 / happens-before**：",
      "   - 僅有「同步事件」（如 channel 傳遞、`sync.Mutex` 加解鎖、`sync/atomic`）才能建立明確的 happens-before 關係，確保可見性。",
      "",
      "3. **關閉 channel 的慣例**：",
      "   - **只有 sender 負責關閉**；receiver 不應關閉它「讀」的 channel。",
      "   - 透過 `for v := range ch { ... }` 迴圈安全讀取直到關閉：",
      "",
      "```go",
      "func producer(ch chan<- int) {",
      "    for i := 0; i < 10; i++ { ch <- i }",
      "    close(ch)",
      "}",
      "func consumer(ch <-chan int) {",
      "    for v := range ch { fmt.Println(v) }",
      "}",
      "```",
      "",
      "4. **worker pool 範式**：",
      "   - 使用 `jobs` / `results` 兩個 channel，加上 `WaitGroup` 控制收尾，能避免 goroutine 泄漏。",
      "",
      "5. **select 的公平性**：",
      "   - 多個分支同時就緒時是**隨機**挑選；若需要優先順序，請調整結構或設計多層 select。",
      "",
      "6. **Context 的傳遞原則**：",
      "   - 由**上游建立**，一路往下傳遞；不要把 `context.Context` 存成 struct 欄位長期保存。",
      "",
      "7. **自旋鎖慎用**：",
      "   - 在 Go 常見寫法裡，`sync.Mutex` 幾乎都比自旋鎖更合適；自旋鎖適用於極短臨界區且競爭非常低的情境。",
      "",
      "## 程式練習",
      "```go",
      "package main",
      "",
      "import (",
      '    "context"',
      '    "fmt"',
      '    "sync"',
      '    "sync/atomic"',
      '    "time"',
      ")",
      "",
      "// Helper function to print section titles",
      "func printTitle(title string) {",
      '    fmt.Printf("\\n==================================================\\n")',
      '    fmt.Printf("====== %s\\n", title)',
      '    fmt.Printf("==================================================\\n")',
      "}",
      "",
      "func main() {",
      "    // 執行 Lab 1 的所有範例和練習",
      "",
      "    // 1. Race Condition 競爭條件問題展示",
      "    demoRaceCondition()",
      "",
      "    // 2. 使用 Atomic (原子操作) 解決競爭條件",
      "    demoAtomic()",
      "",
      "    // 3. 使用 Mutex (互斥鎖) 解決競爭條件 (練習題 4)",
      "    demoMutex()",
      "",
      "    // 4. Channel 的各種用法",
      "    demoChannels()",
      "",
      "    // 5. Select 的多路複用與超時",
      "    demoSelect()",
      "",
      "    // 6. WaitGroup 等待 Goroutine 完成",
      "    demoWaitGroup()",
      "",
      "    // 7. Context 控制 Goroutine 的生命週期",
      "    demoContext()",
      "",
      "    // 8. 練習題 5: nil channel 造成的 Deadlock",
      "    demoNilChannelError()",
      "",
      "    // 9. 練習題 6: time.After 的潛在內存洩漏與修正",
      "    demoTimeAfterLeak()",
      "}",
      "",
      "// ==================================================",
      "// 1. Race Condition 競爭條件問題展示",
      "// ==================================================",
      "func demoRaceCondition() {",
      '    printTitle("1. Race Condition 展示")',
      "    var counter int64 = 0",
      "    var wg sync.WaitGroup",
      "    numGoroutines := 5000",
      "",
      "    wg.Add(numGoroutines)",
      "    for i := 0; i < numGoroutines; i++ {",
      "        go func() {",
      "            defer wg.Done()",
      "            // 這不是原子操作，會導致 race condition",
      "            counter++",
      "        }()",
      "    }",
      "    wg.Wait()",
      "",
      '    fmt.Printf("預期計數為: %d\\n", numGoroutines)',
      '    fmt.Printf("不使用鎖的實際結果: %d (通常會小於預期值)\\n", counter)',
      '    fmt.Println("分析: 因為 counter++ 不是原子操作，多個 goroutine 同時讀取、修改、寫回 counter 會導致更新遺失。")',
      "}",
      "",
      "// ==================================================",
      "// 2. 使用 Atomic (原子操作) 解決競爭條件",
      "// ==================================================",
      "func demoAtomic() {",
      '    printTitle("2. Atomic 原子操作解決方案")',
      "    var counter int64 = 0",
      "    var wg sync.WaitGroup",
      "    numGoroutines := 5000",
      "",
      "    wg.Add(numGoroutines)",
      "    for i := 0; i < numGoroutines; i++ {",
      "        go func() {",
      "            defer wg.Done()",
      "            // 使用 atomic.AddInt64 保證操作的原子性",
      "            atomic.AddInt64(&counter, 1)",
      "        }()",
      "    }",
      "    wg.Wait()",
      "",
      '    fmt.Printf("預期計數為: %d\\n", numGoroutines)',
      '    fmt.Printf("使用 Atomic 的實際結果: %d (結果正確)\\n", counter)',
      '    fmt.Println("分析: Atomic 操作由硬體層級保證不可中斷，效率高且能確保結果正確。")',
      "}",
      "",
      "// ==================================================",
      "// 3. 練習題 4: 使用 Mutex (互斥鎖) 解決競爭條件",
      "// ==================================================",
      "type SafeCounter struct {",
      "    mu    sync.Mutex",
      "    value int",
      "}",
      "",
      "func (c *SafeCounter) Increment() {",
      "    c.mu.Lock()",
      "    defer c.mu.Unlock()",
      "    c.value++",
      "}",
      "",
      "func demoMutex() {",
      '    printTitle("3. Mutex 互斥鎖解決方案 (練習題 4)")',
      "    counter := SafeCounter{}",
      "    var wg sync.WaitGroup",
      "    numGoroutines := 5000",
      "",
      "    wg.Add(numGoroutines)",
      "    for i := 0; i < numGoroutines; i++ {",
      "        go func() {",
      "            defer wg.Done()",
      "            counter.Increment()",
      "        }()",
      "    }",
      "    wg.Wait()",
      "",
      '    fmt.Printf("預期計數為: %d\\n", numGoroutines)',
      '    fmt.Printf("使用 Mutex 的實際結果: %d (結果正確)\\n", counter.value)',
      '    fmt.Println("分析: Mutex 透過鎖定機制，確保一次只有一個 goroutine 能進入臨界區 (critical section) 修改值。")',
      "}",
      "",
      "// ==================================================",
      "// 4. Channel 的各種用法",
      "// ==================================================",
      "func demoChannels() {",
      '    printTitle("4. Channel 用法展示")',
      "",
      "    // Unbuffered Channel (無緩衝)",
      "    unbufChan := make(chan string)",
      "    go func() {",
      "        // 傳送方會阻塞，直到接收方準備好",
      '        unbufChan <- "Hello Unbuffered!"',
      '        fmt.Println("Unbuffered: 已傳送資料")',
      "    }()",
      "    time.Sleep(1 * time.Second) // 模擬一些延遲，證明傳送方在等待",
      '    fmt.Println("Unbuffered: 準備接收資料...")',
      "    msg := <-unbufChan",
      '    fmt.Printf("Unbuffered: 收到訊息: %q\\n\\n", msg)',
      "",
      "    // Buffered Channel (有緩衝)",
      "    bufChan := make(chan int, 2)",
      "    // 傳送方不會阻塞，因為緩衝區還有空間",
      "    bufChan <- 1",
      "    bufChan <- 2",
      '    fmt.Println("Buffered: 已傳送 2 個值，因為緩衝區夠大，所以沒有阻塞。")',
      "",
      '    fmt.Printf("Buffered: 收到值: %d\\n", <-bufChan)',
      '    fmt.Printf("Buffered: 收到值: %d\\n\\n", <-bufChan)',
      "",
      "    // Unidirectional Channel (單向通道)",
      "    biChan := make(chan string) // 雙向通道",
      "    // 函式 producer 只接受 send-only channel",
      "    go producer(biChan)",
      "    // 函式 consumer 只接受 receive-only channel",
      "    consumer(biChan)",
      "}",
      "",
      "// producer 函式只能向 channel 傳送資料",
      "func producer(ch chan<- string) {",
      '    ch <- "Hello Unidirectional!"',
      "}",
      "",
      "// consumer 函式只能從 channel 接收資料",
      "func consumer(ch <-chan string) {",
      "    msg := <-ch",
      '    fmt.Printf("Unidirectional: 收到訊息: %q\\n", msg)',
      "}",
      "",
      "// ==================================================",
      "// 5. Select 的多路複用與超時",
      "// ==================================================",
      "func demoSelect() {",
      '    printTitle("5. Select 用法展示")',
      "    ch1 := make(chan string)",
      "    ch2 := make(chan string)",
      "",
      "    go func() {",
      "        time.Sleep(1 * time.Second)",
      '        ch1 <- "來自 ch1 的訊息"',
      "    }()",
      "    go func() {",
      "        time.Sleep(2 * time.Second)",
      '        ch2 <- "來自 ch2 的訊息"',
      "    }()",
      "",
      "    // Select 會等待多個 channel",
      "    for i := 0; i < 2; i++ {",
      "        select {",
      "        case msg1 := <-ch1:",
      '            fmt.Printf("Select: 收到: %s\\n", msg1)',
      "        case msg2 := <-ch2:",
      '            fmt.Printf("Select: 收到: %s\\n", msg2)',
      "        case <-time.After(3 * time.Second):",
      '            fmt.Println("Select: 等待超過 3 秒，超時了！")',
      "        }",
      "    }",
      "}",
      "",
      "// ==================================================",
      "// 6. WaitGroup 等待 Goroutine 完成",
      "// ==================================================",
      "func worker(id int, wg *sync.WaitGroup) {",
      "    defer wg.Done()",
      '    fmt.Printf("Worker %d: 開始工作\\n", id)',
      "    time.Sleep(time.Second)",
      '    fmt.Printf("Worker %d: 工作完成\\n", id)',
      "}",
      "",
      "func demoWaitGroup() {",
      '    printTitle("6. WaitGroup 展示")',
      "    var wg sync.WaitGroup",
      "",
      "    for i := 1; i <= 3; i++ {",
      "        wg.Add(1)",
      "        go worker(i, &wg)",
      "    }",
      "",
      '    fmt.Println("Main: 等待所有 Worker 完成...")',
      "    wg.Wait()",
      '    fmt.Println("Main: 所有 Worker 都已完成工作！")',
      "}",
      "",
      "// ==================================================",
      "// 7. Context 控制 Goroutine 的生命週期",
      "// ==================================================",
      "func contextWorker(ctx context.Context, name string) {",
      "    for {",
      "        select {",
      "        case <-ctx.Done():",
      '            fmt.Printf("%s: 收到取消信號，準備退出。\\n", name)',
      "            return",
      "        default:",
      '            fmt.Printf("%s: 正在工作...\\n", name)',
      "            time.Sleep(1 * time.Second)",
      "        }",
      "    }",
      "}",
      "",
      "func demoContext() {",
      '    printTitle("7. Context 展示")',
      "    ctx, cancel := context.WithCancel(context.Background())",
      "",
      '    go contextWorker(ctx, "Worker-A")',
      '    go contextWorker(ctx, "Worker-B")',
      "",
      '    fmt.Println("Main: 啟動了兩個 worker，等待 3 秒後發出取消信號...")',
      "    time.Sleep(3 * time.Second)",
      "",
      '    fmt.Println("Main: 發出取消信號！")',
      "    cancel()",
      "",
      "    time.Sleep(1 * time.Second)",
      '    fmt.Println("Main: 程式結束。")',
      "}",
      "",
      "// ==================================================",
      "// 8. 練習題 5: nil channel 造成的 Deadlock",
      "// ==================================================",
      "func demoNilChannelError() {",
      '    printTitle("8. 練習題 5: nil channel 錯誤")',
      "    fmt.Println(\"下面的程式碼被註解掉了，因為它會導致 panic。\")",
      "    fmt.Println(\"錯誤原因: `var intChan chan int` 只是宣告，其值為 nil。對 nil channel 的操作會永久阻塞。\")",
      "    fmt.Println(\"修正方法: 使用 make 進行初始化。\")",
      "    intChanCorrect := make(chan int, 1)",
      "    intChanCorrect <- 10",
      '    fmt.Printf("修正後: 成功向 channel 寫入值 %d\\n", <-intChanCorrect)',
      "}",
      "",
      "// ==================================================",
      "// 9. 練習題 6: time.After 的潛在內存洩漏與修正",
      "// ==================================================",
      "func demoTimeAfterLeak() {",
      '    printTitle("9. 練習題 6: time.After 風險與修正")',
      "    ch := make(chan bool)",
      "",
      '    fmt.Println("情境: 在一個迴圈中使用 time.After 可能會產生資源洩漏。")',
      '    fmt.Println("因為即使 ch 很快收到信號，time.After 創建的計時器資源也要等到計時結束後才能被回收。")',
      "",
      "    go func() {",
      "        time.Sleep(50 * time.Millisecond)",
      "        ch <- true",
      "    }()",
      "",
      "    // 不好的作法",
      "    select {",
      "    case <-ch:",
      '        fmt.Println("time.After 風險: 雖然很快收到了 ch 的信號，但 time.After 的資源仍在後台等待。")',
      "    case <-time.After(1 * time.Second):",
      '        fmt.Println("Timeout")',
      "    }",
      "",
      '    fmt.Println("\\n修正方法: 使用 time.NewTimer，並在不需要時計時呼叫 Stop()。")',
      "    timer := time.NewTimer(1 * time.Second)",
      "",
      "    go func() {",
      "        time.Sleep(50 * time.Millisecond)",
      "        ch <- true",
      "    }()",
      "",
      "    select {",
      "    case <-ch:",
      '        fmt.Println("Timer 修正: 收到 ch 的信號。")',
      "    case <-timer.C:",
      '        fmt.Println("Timer 修正: 超時。")',
      "    }",
      "     // 如果沒能成功阻止計時器",
      "    if !timer.Stop() {",
      "     // 那就代表信箱裡一定有封信，我們就主動把這封信讀出來並丟掉，確保信箱是乾淨的，以防萬一",
      "        <-timer.C",
      "    }",
      '    fmt.Println("Timer 修正: 手動停止計時器，確保資源被釋放。")',
      "}",
      "```",
      "---"
    ].join("\n")
  }



];





// example

// {
//   id: "n-nycu-dl-2025",
//   slug: "nycu-deep-learning-2025",
//   title: "NYCU Deep Learning (Summer 2025)",
//   date: "2025-07-01",
//   category: "school-curriculum",            
//   cover: `${process.env.PUBLIC_URL}/DL.png`,
//   tags: ["Deep Learning","NYCU","Course","Labs","Reinforcement Learning","Diffusion"],
//   // cover 可留空，沒有就會走你卡片的漸層預設
//   summary:
//     "NYCU 資工暑期 Deep Learning 課程：主題、評分、時程、參考書與實作倉庫。含 Labs、論文報告與期末專題。",
//   content: `
// # NYCU Deep Learning (Summer 2025)
// > National Yang Ming Chiao Tung University — Department of Computer Science

// **GitHub Repo**：<https://github.com/solar224/NYCU_DL>

// [![Course](https://img.shields.io/badge/Course-Deep%20Learning-blue)]()
// [![Semester](https://img.shields.io/badge/Semester-Summer%202025-informational)]()
// [![Language](https://img.shields.io/badge/Language-English-lightgrey)]()

// ---

// ## Table of Contents
// - [Overview](#課程簡介-overview)
// - [Instructors](#授課教師與助教-instructors--tas)
// - [Grading](#評分方式-grading)
// - [Schedule](#時程與主題-schedule)
// - [Textbooks & References](#教材與參考-textbooks--references)
// - [Repo Structure](#專案倉庫建議結構-suggested-repo-structure)

// ---

// ## 課程簡介
// 本課程兼顧 **理論** 與 **實作**，內容涵蓋：
// - 深層前饋網路、CNN、RNN/Recursive nets  
// - Autoencoders、Linear factor models、GANs、Normalizing flows、Diffusion  
// - 強化學習（值函數、政策、模型式）  
// - 期末以**論文風格**發表專題

// ---

// ## 授課教師
// - 彭文孝（Peng）｜wpeng@cs.nctu.edu.tw  
// - 陳永昇（Chen）｜yschen@nycu.edu.tw  
// - 謝秉均（Hsieh）｜pinghsieh@cs.nycu.edu.tw  

// ---

// ## 評分方式 
// **Part I（3 學分）Deep Learning**
// - 4 Labs（Lab 0、2、5、6；個別完成）80%
// - 期末考 20%

// **Part II（3 學分）Deep Learning & Practice**
// - 4 Labs（Lab 1、3、4、7）50%
// - 論文報告（3 人一組）25%
// - 期末專題（3 人一組）25%

// ---

// ## 時程與主題
// > Afternoon 為下午課；Evening 為晚間實作／實驗課。Dates in **2025/7–8**.

// | Date | Afternoon Topic                           | Evening / Lab                     |
// |-----:|-------------------------------------------|-----------------------------------|
// | 7/1  | Introduction & ML Basics                  | Warm-up (**Lab 0**)               |
// | 7/3  | Deep Feedforward Networks                 | Back-Propagation (**Lab 1**)      |
// | 7/8  | Convolutional Networks                    | ConvNets & Transformers (**Lab 2**) |
// | 7/10 | Introduction to Reinforcement Learning    | No class                          |
// | 7/15 | Recurrent & Recursive Nets                | MaskGIT (**Lab 3**)               |
// | 7/17 | Linear Factor Models, Autoencoders        | No class                          |
// | 7/22 | Generative Adversarial Networks           | CVAE (**Lab 4**)                  |
// | 7/24 | Value-Based Reinforcement Learning        | No class                          |
// | 7/29 | Policy-Based Reinforcement Learning       | Discrete Control (**Lab 5**)      |
// | 7/31 | Diffusion Models                          | No class                          |
// | 8/5  | Normalizing Flows                         | Diffusion (**Lab 6**)             |
// | 8/7  | Final Project Proposal                    | Final Project Proposal            |
// | 8/12 | Model-Based Reinforcement Learning        | Continuous Control (**Lab 7**)    |
// | 8/14 | No class                                  | No class                          |
// | 8/19 | Paper Presentation                        | Paper Presentation                |
// | 8/21 | Paper Presentation                        | Paper Presentation                |
// | 8/26 | Final Exam                                | —                                 |
// | 8/28 | Final Project Demo                        | —                                 |

// ---

// ## 教材與參考
// - I. Goodfellow, Y. Bengio, A. Courville, *Deep Learning*, MIT Press, 2016.  
// - R. S. Sutton, A. G. Barto, *Reinforcement Learning: An Introduction*, 2020.  
// - 課程材料約自編與既有教材各佔 50%（for reference only）

// ---

// ## 專案倉庫結構
//     .
//     ├── labs/
//     │   ├── lab0_warmup/
//     │   ├── lab1_backprop/
//     │   ├── lab2_conv_transformers/
//     │   ├── lab3_maskgit/
//     │   ├── lab4_cvae/
//     │   ├── lab5_discrete_rl/
//     │   ├── lab6_diffusion/
//     │   └── lab7_continuous_rl/
//     ├── paper_presentation/
//     │   ├── slides/
//     │   └── report/
//     ├── final_project/
//     │   ├── proposal/
//     │   ├── code/
//     │   └── paper/
//     ├── docs/              # notes, additional references
//     ├── .gitignore
//     └── README.md
// `
// }