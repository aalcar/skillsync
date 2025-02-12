technical_keywords_dict = {
    "Software Developer/Engineer": [
        "java", "python", "c++", "javascript", "git", "api", "spring", "django", "react", "angular", "software development", "oop"
    ],
    "Data Scientist": [
        "python", "data analysis", "machine learning", "numpy", "pandas", "sql", "scikit-learn", "deep learning", "hadoop", "spark"
    ],
    "Systems Administrator": [
        "linux", "unix", "windows", "cloud", "aws", "azure", "gcp", "bash", "powershell", "networking", "security"
    ],
    "Network Engineer": [
        "networking", "routing", "switching", "firewalls", "vpn", "wireshark", "tcp/ip", "dns", "load balancing"
    ],
    "Cybersecurity Analyst": [
        "threat analysis", "penetration testing", "firewalls", "ids", "ips", "siem", "splunk", "metasploit", "malware", "encryption"
    ],
    "DevOps Engineer": [
        "ci/cd", "docker", "kubernetes", "terraform", "aws", "azure", "git", "automation", "microservices", "linux", "bash"
    ],
    "Cloud Architect": [
        "cloud computing", "aws", "azure", "gcp", "cloud security", "load balancing", "serverless", "cloud migration"
    ],
    "Artificial Intelligence Engineer": [
        "machine learning", "deep learning", "tensorflow", "pytorch", "computer vision", "nlp", "reinforcement learning"
    ],
    "Software Tester": [
        "manual testing", "automated testing", "selenium", "appium", "load testing", "regression testing", "bug tracking", "test automation"
    ],
    "Database Administrator": [
        "sql", "noSQL", "mysql", "oracle", "postgresql", "database security", "backup and recovery", "indexing", "performance tuning"
    ],
    "App Developer": [
        "swift", "objective-c", "android", "kotlin", "flutter", "react native", "mobile ui", "restful apis", "sqlite"
    ],
    "UX/UI Designer": [
        "wireframing", "sketch", "figma", "adobe xd", "responsive design", "ui/ux", "usability testing", "prototyping", "html", "css"
    ],
    "Full Stack Developer": [
        "html", "css", "javascript", "node.js", "react", "angular", "git", "restful apis", "express", "python", "ruby"
    ],
    "Product Manager": [
        "product roadmap", "agile", "user stories", "stakeholder management", "business analysis", "a/b testing", "kpis"
    ]
}

full_keywords = [keyword for keywords in technical_keywords_dict.values() for keyword in keywords]