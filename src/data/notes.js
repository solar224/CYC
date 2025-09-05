// src/data/notes.js
// 依分區：school-curriculum / coding-practice / other-practice
export const NOTES = [
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
}

];
