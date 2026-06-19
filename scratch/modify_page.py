import re

def update_file():
    filepath = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\app\solutions\phishing-simulation\page.js"
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Rename component
    content = content.replace("InsatPage", "PhishingSimulationPage")
    content = content.replace("export default InsatPage;", "export default PhishingSimulationPage;")
    
    # 1. Hero Section
    content = content.replace("AI-Powered Security Awareness Platform", "Test Human Risk Before Attackers Do")
    content = content.replace("Security Awareness Training Built for Real Behaviour Change", "Identify and Reduce Human Risk Before It Becomes a Breach")
    content = content.replace(
        "InSAT helps organizations move beyond checkbox training with AI-enabled learning\n                                journeys, phishing simulations, microlearning, gamified engagement, and measurable user\n                                progress — all from one unified platform.",
        "Run AI-enabled attack simulations that uncover risky behaviour and trigger instant learning in real time."
    )
    content = content.replace("Explore Platform", "Book a Demo")
    
    # 2. Simulation Types
    content = content.replace("Because Awareness Training Does Not End at Completion", "Modern Attack Simulations")
    content = content.replace(
        "InSAT helps organizations go further than just training — by helping employees learn,\n                            practice, respond, and improve continuously.",
        "Test your workforce across the channels attackers use today."
    )
    
    # Let's replace the check-list
    # The original has 4 li.check-item. We will replace the whole UL with 6 items.
    li_template = """
                        <li className="check-item">
                            <div className="check-icon-wrapper">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12482 5.50058L0 1.37577L1.17852 0.197266L6.48182 5.50058L1.17852 10.8038L0 9.62533L4.12482 5.50058Z" fill="var(--color-emerald)" />
                                </svg>
                            </div>
                            <span className="check-text">{text}</span>
                        </li>"""
    items = [
        "Phishing: Customisable email attacks, fake login pages, attachments.",
        "Smishing & WhatsApp: SMS and WhatsApp-style social engineering messages.",
        "QR Traps: Malicious QR code scenarios for mobile-first risks.",
        "Vishing: Voice-based social engineering tests.",
        "AI Scenario Variants: Adaptive campaigns based on role, risk, and difficulty.",
        "Attachment Simulations: Simulate risky attachments like fake invoices."
    ]
    new_ul = '<ul className="check-list">\n' + ''.join(li_template.format(text=t) for t in items) + '\n                    </ul>'
    
    content = re.sub(r'<ul className="check-list">.*?</ul>', new_ul, content, flags=re.DOTALL)
    
    # 3. Custom Campaign Builder
    content = content.replace('<span className="text-subheading">Features</span>', '<span className="text-subheading">Campaign Builder</span>')
    content = content.replace("Powerful Security Training", "Build Phishing Campaigns That Feel Real to Your Workforce")
    
    # 4. Free Phishing Test
    content = content.replace("Build Security Awareness Across Your Organization", "Start With a Free Phishing Test")
    
    # We will replace the two-col-grid blocks below "Build Security Awareness Across Your Organization"
    # Actually, the user wants "Free Phishing Test" and "Reports & Insights".
    # I can replace the titles of the next sections.
    content = content.replace("AI Adaptive Learning", "Free Phishing Test")
    content = content.replace("Personalize learning journeys based on user performance, risk indicators, and training\n                                history.", "Try a quick phishing challenge and see how ready your team is. We offer a free readiness score preview.")
    content = content.replace("Explore Adaptive Learning", "Start Free Phishing Test")
    
    content = content.replace("Reporting & Human Risk Evidence", "Reports & Insights")
    content = content.replace("Generate structured records of training, assessments, simulations, and participation for\n                                internal reviews and audits.", "Track campaign results, risky users, department trends, and learning progress.")
    content = content.replace("View Reporting Features", "View Reports Dashboard")
    
    # 6. Final CTA
    content = content.replace("Integrate with Your IT & Security Stack", "Ready to Test Your Workforce?")
    content = content.replace(
        "Ditch the manual admin work. InSAT auto-syncs with your identity providers, LMS, and\n                        communication platforms to automate training management.",
        "Run safe simulations and turn risky behaviour into measurable learning."
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

update_file()
