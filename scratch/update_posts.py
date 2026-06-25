import os

posts_data = [
    {
        "filename": "post-1.md",
        "title": "10 Phishing Trends to Watch in 2026",
        "image": "/images/blog/01.jpg",
        "author_name": "Abdullah Al Shifat",
        "author_avatar": "/images/author/abdullah.jpg",
        "date": "2026-06-19T05:00:00Z",
        "categories": ["Phishing"],
        "content": "Phishing attacks are becoming increasingly sophisticated. In 2026, attackers are leveraging advanced techniques like AI-driven message personalization, QR code manipulation, and multi-vector campaigns targeting WhatsApp and voice communications. Organizations must adapt their defense training accordingly to survive these modern threat variants."
    },
    {
        "filename": "post-2.md",
        "title": "Why Security Awareness Training is Critical for Regulatory Compliance",
        "image": "/images/blog/02.jpg",
        "author_name": "Derick Barker",
        "author_avatar": "/images/author/derick.jpg",
        "date": "2026-06-15T05:00:00Z",
        "categories": ["Security Awareness Training"],
        "content": "Meeting global regulatory mandates like GDPR, HIPAA, and India's DPDP Act requires more than just policy documents. It requires defensible evidence of security awareness. Interactive, role-based courses and tracking policy acknowledgements ensure audit-ready compliance while building genuine defensive behavior."
    },
    {
        "filename": "post-3.md",
        "title": "How Social Engineering Exploits Remote Employees",
        "image": "/images/blog/03.jpg",
        "author_name": "Abdullah Al Shifat",
        "author_avatar": "/images/author/abdullah.jpg",
        "date": "2026-06-10T05:00:00Z",
        "categories": ["Social Engineering"],
        "content": "Remote and hybrid workforces are highly vulnerable to social engineering. Attackers impersonate IT support, executives, or service providers, exploiting the lack of physical verification. Implementing clear communication guidelines and regular susceptibility testing reduces remote workforce risk scores significantly."
    },
    {
        "filename": "post-4.md",
        "title": "The Threat of Deepfakes in Corporate Communications",
        "image": "/images/blog/04.jpg",
        "author_name": "Derick Barker",
        "author_avatar": "/images/author/derick.jpg",
        "date": "2026-06-05T05:00:00Z",
        "categories": ["Deepfake"],
        "content": "Deepfake technology has advanced to the point where voice and video clones can mimic executives with near-perfect accuracy. Organizations must establish strict multi-party authentication policies for financial transactions and sensitive data sharing, while training teams to identify subtle visual and auditory tells."
    },
    {
        "filename": "post-5.md",
        "title": "Leveraging AI to Prevent Credential Harvesting",
        "image": "/images/blog/05.jpg",
        "author_name": "Abdullah Al Shifat",
        "author_avatar": "/images/author/abdullah.jpg",
        "date": "2026-05-28T05:00:00Z",
        "categories": ["AI"],
        "content": "AI is a double-edged sword. While attackers use it to generate highly convincing lures, security teams leverage AI adaptive learning to tailor awareness training dynamically. By analyzing employee susceptibility and adjusting campaign difficulty, organizations build a personalized human firewall."
    },
    {
        "filename": "post-6.md",
        "title": "Spear Phishing vs. Phishing: Understanding the Differences",
        "image": "/images/blog/06.jpg",
        "author_name": "Derick Barker",
        "author_avatar": "/images/author/derick.jpg",
        "date": "2026-05-20T05:00:00Z",
        "categories": ["Phishing", "Social Engineering"],
        "content": "Generic phishing campaigns cast a wide net, but spear phishing is laser-focused on specific individuals. Attackers research targets on LinkedIn and social media to craft highly customized messages. Training employees to recognize public data exposure and verify unusual internal requests is vital."
    },
    {
        "filename": "post-7.md",
        "title": "Why Microlearning is the Future of Security Awareness",
        "image": "/images/blog/07.jpg",
        "author_name": "Abdullah Al Shifat",
        "author_avatar": "/images/author/abdullah.jpg",
        "date": "2026-05-12T05:00:00Z",
        "categories": ["Security Awareness Training"],
        "content": "Long, annual security training sessions are largely ineffective because employees suffer from information overload. Microlearning—bite-sized, targeted modules delivered frequently—replaces lecturing with reinforcement. Gamified learning and quiz arcade challenges drive long-term secure habit formation."
    },
    {
        "filename": "post-8.md",
        "title": "Combating AI-Generated Social Engineering Attacks",
        "image": "/images/blog/08.jpg",
        "author_name": "Derick Barker",
        "author_avatar": "/images/author/derick.jpg",
        "date": "2026-05-01T05:00:00Z",
        "categories": ["Social Engineering", "AI"],
        "content": "AI allows attackers to scale personalized social engineering campaigns at near-zero cost. From drafting flawless emails to automating phone calls, AI-led variants are rapidly proliferating. Building awareness about automated vishing and smishing campaigns is the first line of defense."
    }
]

posts_dir = "content/posts"

for post in posts_data:
    filepath = os.path.join(posts_dir, post["filename"])
    categories_str = "\n".join(f"  - {cat}" for cat in post["categories"])
    
    content = f"""---
title: "{post['title']}"
image: "{post['image']}"
author:
  name: "{post['author_name']}"
  avatar: "{post['author_avatar']}"
date: {post['date']}
draft: false
categories:
{categories_str}
---

{post['content']}
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {filepath}")
