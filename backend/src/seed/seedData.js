export const initialSeedData = {
  user: {
    id: "user_ramya_01",
    name: "Ramya Sri",
    email: "ramya@lifeos.dev",
    role: "Senior Software Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Building high-performance systems & striving for continuous 360° life growth.",
    currency: "₹",
    lifeScore: 88,
    createdAt: new Date("2026-01-01").toISOString()
  },
  lifeScoreMetrics: {
    overall: 88,
    career: 92,
    finance: 85,
    productivity: 89,
    learning: 90,
    health: 82,
    relationships: 86
  },
  tasks: [
    {
      id: "task_1",
      title: "Office Work - Sprint Feature Release",
      category: "Career",
      priority: "Urgent-Important",
      urgency: 9,
      importance: 10,
      deadline: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
      estimatedMinutes: 180,
      completed: true,
      completedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      tags: ["Work", "Sprint", "High-Value"]
    },
    {
      id: "task_2",
      title: "Electricity Bill Payment",
      category: "Finance",
      priority: "Urgent-Important",
      urgency: 10,
      importance: 9,
      deadline: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
      estimatedMinutes: 15,
      completed: false,
      tags: ["Finance", "Due Today"]
    },
    {
      id: "task_3",
      title: "Complete System Design Assignment",
      category: "Learning",
      priority: "Urgent-Important",
      urgency: 8,
      importance: 9,
      deadline: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      estimatedMinutes: 90,
      completed: false,
      tags: ["Assignment", "Study"]
    },
    {
      id: "task_4",
      title: "Python Advanced Architecture Mastery",
      category: "Learning",
      priority: "NotUrgent-Important",
      urgency: 6,
      importance: 9,
      deadline: new Date(Date.now() + 4 * 86400 * 1000).toISOString(),
      estimatedMinutes: 60,
      completed: false,
      tags: ["Learning", "Python", "1 Hour"]
    },
    {
      id: "task_5",
      title: "Job Interview Preparation & Mock DSA",
      category: "Career",
      priority: "NotUrgent-Important",
      urgency: 6,
      importance: 10,
      deadline: new Date(Date.now() + 7 * 86400 * 1000).toISOString(),
      estimatedMinutes: 45,
      completed: false,
      tags: ["Career", "Preparation", "30-45 Min"]
    },
    {
      id: "task_6",
      title: "Review Monthly Mutual Fund Investments",
      category: "Finance",
      priority: "NotUrgent-Important",
      urgency: 4,
      importance: 8,
      deadline: new Date(Date.now() + 10 * 86400 * 1000).toISOString(),
      estimatedMinutes: 30,
      completed: false,
      tags: ["Savings", "SIP"]
    }
  ],
  decisions: [
    {
      id: "dec_job_offer_2026",
      title: "Should I accept the Senior Full-Stack Job Offer?",
      category: "Career",
      status: "In Progress",
      summary: "Comparison between staying at current company vs accepting high-growth new offer.",
      createdAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
      options: [
        {
          name: "Current Job",
          scores: {
            salary: 30000,
            travelTimeMin: 20,
            travelCost: 1500,
            growthRating: 6,
            learningRating: 6,
            monthlyExpense: 12000,
            workLifeBalance: 8
          },
          overallScore: 72,
          pros: ["Very low travel time (20 mins)", "Stable comfortable environment", "Good work-life balance"],
          cons: ["Below market compensation", "Slower technical growth", "Limited leadership scope"]
        },
        {
          name: "New Job Offer (Acme Tech)",
          scores: {
            salary: 42000,
            travelTimeMin: 90,
            travelCost: 4500,
            growthRating: 9,
            learningRating: 9,
            monthlyExpense: 18000,
            workLifeBalance: 7
          },
          overallScore: 86,
          pros: ["40% Salary Hike (₹42,000/mo)", "Cutting-edge tech stack & AI integration", "Rapid promotion trajectory"],
          cons: ["Commute is 90 mins one-way", "Higher city/travel expenses", "Steeper initial learning curve"]
        }
      ],
      weights: {
        salary: 0.25,
        growth: 0.25,
        learning: 0.20,
        workLife: 0.15,
        travelTime: 0.15
      },
      recommendation: {
        winner: "New Job Offer (Acme Tech)",
        confidencePercentage: 86,
        summary: "New Job has significantly better long-term career velocity (+40% salary hike, 9/10 growth), though commute mitigation (cab/hybrid days) is strongly advised.",
        tradeOffs: "₹12,000 extra salary easily offsets the ₹3,000 additional travel expense. The 90-minute commute can be utilized for podcasts or remote negotiation."
      }
    },
    {
      id: "dec_stack_2026",
      title: "Backend Tech Stack for Enterprise Microservices",
      category: "Learning & Projects",
      status: "Decided",
      summary: "Evaluated Node.js/Express vs Python/FastAPI vs Go.",
      createdAt: new Date(Date.now() - 14 * 86400 * 1000).toISOString(),
      options: [
        {
          name: "Node.js (Express/TypeScript)",
          scores: { salary: 85000, growthRating: 9, learningRating: 8, workLifeBalance: 8 },
          overallScore: 91,
          pros: ["Unified JS/TS ecosystem", "Massive NPM packages", "High event-loop I/O speed"],
          cons: ["CPU-intensive task limits"]
        },
        {
          name: "Python (FastAPI)",
          scores: { salary: 80000, growthRating: 8.5, learningRating: 9, workLifeBalance: 7.5 },
          overallScore: 85,
          pros: ["Direct AI/ML integrations", "Pydantic validation", "Clean syntax"],
          cons: ["Slightly lower raw concurrent throughput"]
        }
      ],
      recommendation: {
        winner: "Node.js (Express/TypeScript)",
        confidencePercentage: 91,
        summary: "Node.js chosen for maximum reuse across client/server and superior concurrent API response times."
      }
    }
  ],
  smartPlanner: {
    dailyPriorityList: [
      { rank: 1, badge: "🔴 P1 - Highest", title: "Office Work - Sprint Release", action: "Finish sprint PRs and test cases before 4 PM", timeAllocated: "3.0 hrs" },
      { rank: 2, badge: "🔴 P2 - Critical", title: "Electricity Bill Payment", action: "Pay online before midnight to prevent late fee", timeAllocated: "15 min" },
      { rank: 3, badge: "🟠 P3 - Urgent", title: "System Design Assignment", action: "Complete architecture diagram and submit", timeAllocated: "1.5 hrs" },
      { rank: 4, badge: "🟡 P4 - Important", title: "Python Advanced Architecture", action: "Deep dive into AsyncIO and Generators", timeAllocated: "1.0 hr" },
      { rank: 5, badge: "🟢 P5 - Growth", title: "Job Preparation & DSA", action: "Solve 2 Graph/Dynamic Programming problems", timeAllocated: "45 min" }
    ],
    weeklyDistribution: [
      { subject: "Python Mastery", hoursTarget: 7, hoursSpent: 5.5, icon: "Code", color: "#3B82F6" },
      { subject: "Job Preparation & DSA", hoursTarget: 5, hoursSpent: 3.5, icon: "Briefcase", color: "#8B5CF6" },
      { subject: "Projects & Architecture", hoursTarget: 4, hoursSpent: 4.0, icon: "Layers", color: "#10B981" },
      { subject: "Exercise & Fitness", hoursTarget: 3.5, hoursSpent: 3.0, icon: "Activity", color: "#EF4444" },
      { subject: "System Design & Books", hoursTarget: 2.5, hoursSpent: 1.5, icon: "BookOpen", color: "#F59E0B" }
    ],
    aiInsight: "Great progress this week! Focus heavily on the System Design Assignment today. If you finish Office Work by 4 PM, allocate 1 hour for Python AsyncIO to hit your weekly learning goal."
  },
  career: {
    skills: [
      { name: "React / Next.js", level: "Expert", proficiency: 92, category: "Frontend" },
      { name: "Node.js / Express", level: "Advanced", proficiency: 88, category: "Backend" },
      { name: "Python / Data Engineering", level: "Proficient", proficiency: 84, category: "Backend" },
      { name: "PostgreSQL & MongoDB", level: "Advanced", proficiency: 86, category: "Database" },
      { name: "AWS Cloud & Docker", level: "Intermediate", proficiency: 78, category: "DevOps" },
      { name: "System Design & Microservices", level: "Advanced", proficiency: 85, category: "Architecture" }
    ],
    projects: [
      {
        id: "proj_1",
        title: "LifeOS Platform",
        description: "Personal Life Management & Decision Support Platform with AI Smart Planning & Financial Engines.",
        status: "In Active Development",
        progress: 95,
        tech: ["React", "Tailwind CSS", "Node.js", "Express", "Decision Matrix Engine"],
        github: "https://github.com/Ramyasree1725/smart-hostel-system",
        liveUrl: "https://lifeos.dev"
      },
      {
        id: "proj_2",
        title: "Smart Hostel Management Suite",
        description: "Automated room allocation, digital attendance, mess billing, and complaint management platform.",
        status: "Completed",
        progress: 100,
        tech: ["MERN Stack", "JWT Auth", "Recharts", "Razorpay"],
        github: "https://github.com/Ramyasree1725/smart-hostel-system"
      },
      {
        id: "proj_3",
        title: "Algorithmic Market Sentiment Screener",
        description: "Real-time news & financial data aggregation engine with natural language sentiment scores.",
        status: "Planning",
        progress: 40,
        tech: ["Python", "FastAPI", "Pandas", "Transformers"]
      }
    ],
    jobApplications: [
      {
        id: "job_1",
        company: "Acme Tech Solutions",
        role: "Senior Full Stack Engineer",
        status: "Offer Received",
        salaryOffered: "₹42,000 / mo",
        location: "Bengaluru / Hybrid",
        appliedDate: "2026-08-15",
        nextStep: "Offer Discussion & Relocation Support",
        notes: "Excellent culture, modern stack (React/FastAPI/K8s)."
      },
      {
        id: "job_2",
        company: "NovaScale Cloud",
        role: "Lead Platform Engineer",
        status: "Interviewing",
        salaryOffered: "₹50,000 / mo",
        location: "Hyderabad",
        appliedDate: "2026-08-20",
        nextStep: "Technical System Design Round (Oct 12)",
        notes: "Great team, microservices scale handling 10M requests."
      },
      {
        id: "job_3",
        company: "Stellar AI Labs",
        role: "Software Development Engineer II",
        status: "Applied",
        salaryOffered: "₹45,000 / mo",
        location: "Remote",
        appliedDate: "2026-09-02",
        nextStep: "Resume Screening",
        notes: "Applied via employee referral."
      }
    ]
  },
  finance: {
    currency: "₹",
    monthlyIncome: 65000,
    monthlyExpense: 24500,
    monthlySavings: 40500,
    savingsRate: 62.3,
    budgets: [
      { category: "Housing & Rent", allocated: 12000, spent: 12000, color: "#3B82F6" },
      { category: "Food & Groceries", allocated: 7000, spent: 4800, color: "#10B981" },
      { category: "Utilities & Bills", allocated: 3500, spent: 2200, color: "#F59E0B" },
      { category: "Travel & Fuel", allocated: 4000, spent: 2500, color: "#8B5CF6" },
      { category: "Entertainment & Dining", allocated: 3500, spent: 3000, color: "#EC4899" }
    ],
    bills: [
      { id: "bill_1", name: "Electricity Bill (TSSPDCL)", amount: 1420, dueDate: "2026-09-12", status: "Pending", category: "Utilities" },
      { id: "bill_2", name: "Airtel Fiber Broadband", amount: 1179, dueDate: "2026-09-18", status: "Upcoming", category: "Internet" },
      { id: "bill_3", name: "Apartment Maintenance", amount: 2500, dueDate: "2026-09-25", status: "Upcoming", category: "Housing" }
    ],
    savingsGoals: [
      { id: "sav_1", name: "Emergency Fund (6 Months)", target: 200000, current: 165000, deadline: "2026-12-31", color: "#10B981" },
      { id: "sav_2", name: "MacBook Pro M3 Max", target: 180000, current: 120000, deadline: "2026-11-15", color: "#3B82F6" },
      { id: "sav_3", name: "Annual Vacation Fund (Goa/Bali)", target: 60000, current: 45000, deadline: "2026-12-20", color: "#F59E0B" }
    ],
    recentTransactions: [
      { id: "tx_1", date: "2026-09-08", title: "Monthly Salary Credited", type: "income", amount: 65000, category: "Salary" },
      { id: "tx_2", date: "2026-09-07", title: "House Rent", type: "expense", amount: 12000, category: "Housing" },
      { id: "tx_3", date: "2026-09-06", title: "Organic Groceries & Staples", type: "expense", amount: 2400, category: "Food" },
      { id: "tx_4", date: "2026-09-04", title: "Mutual Fund SIP Investment", type: "expense", amount: 15000, category: "Savings" }
    ]
  },
  learning: {
    courses: [
      {
        id: "course_1",
        title: "Advanced System Design & Distributed Architecture",
        instructor: "Senior Principal Engineers",
        progress: 75,
        totalModules: 16,
        completedModules: 12,
        status: "Active",
        certificateEarned: false
      },
      {
        id: "course_2",
        title: "Python AsyncIO, Concurrency & High-Scale Microservices",
        instructor: "Core Tech Leads",
        progress: 88,
        totalModules: 10,
        completedModules: 9,
        status: "Active",
        certificateEarned: false
      },
      {
        id: "course_3",
        title: "AWS Certified Solutions Architect Associate",
        instructor: "Cloud Experts",
        progress: 100,
        totalModules: 20,
        completedModules: 20,
        status: "Completed",
        certificateEarned: true
      }
    ],
    upcomingExams: [
      {
        id: "exam_1",
        name: "AWS Solutions Architect Re-certification Exam",
        date: "2026-10-15",
        targetScore: "850/1000",
        daysRemaining: 36,
        status: "Scheduled"
      },
      {
        id: "exam_2",
        name: "Enterprise System Design Assessment",
        date: "2026-09-28",
        targetScore: "95%",
        daysRemaining: 19,
        status: "Preparing"
      }
    ]
  },
  health: {
    habits: [
      { id: "h_1", name: "Drink 3.0 Litres Water", streak: 18, target: "3000 ml", todayCompleted: true, category: "Hydration", icon: "Droplets" },
      { id: "h_2", name: "1 Hour Deep Coding / Study", streak: 24, target: "60 min", todayCompleted: true, category: "Productivity", icon: "Code" },
      { id: "h_3", name: "Morning Workout / Yoga", streak: 12, target: "45 min", todayCompleted: true, category: "Fitness", icon: "Activity" },
      { id: "h_4", name: "Read Tech / Philosophy Book", streak: 9, target: "20 pages", todayCompleted: false, category: "Mindset", icon: "Book" },
      { id: "h_5", name: "Sleep by 11:00 PM", streak: 5, target: "7.5 hrs", todayCompleted: false, category: "Recovery", icon: "Moon" }
    ],
    waterIntake: {
      currentMl: 2250,
      goalMl: 3000,
      percentage: 75
    },
    todayWorkout: {
      name: "Core Strength & 5K Cardio Run",
      durationMinutes: 45,
      caloriesBurned: 380,
      status: "Completed"
    },
    sleepHistory: [
      { day: "Mon", hours: 7.5 },
      { day: "Tue", hours: 8.0 },
      { day: "Wed", hours: 7.2 },
      { day: "Thu", hours: 7.8 },
      { day: "Fri", hours: 6.9 },
      { day: "Sat", hours: 8.5 },
      { day: "Sun", hours: 8.0 }
    ]
  },
  travel: [
    {
      id: "trip_1",
      destination: "Goa Beach & Tech Retreat 2026",
      startDate: "2026-11-20",
      endDate: "2026-11-24",
      status: "Confirmed",
      budget: 35000,
      spent: 12000,
      itinerary: [
        { day: 1, title: "Arrival & North Goa Beach Sunset", done: false },
        { day: 2, title: "Scuba Diving & Water Sports at Grand Island", done: false },
        { day: 3, title: "Old Goa Heritage Walk & Cafe Hopping", done: false },
        { day: 4, title: "South Goa Peace & Coastal Sunset Cruise", done: false }
      ],
      packingList: [
        { item: "Power Bank & Fast Charger", packed: true },
        { item: "Sunscreen SPF 50+", packed: true },
        { item: "Beachwear & Linen Shirts", packed: false },
        { item: "Noise-Cancelling Headphones", packed: true },
        { item: "ID Proofs & Flight Tickets", packed: true }
      ]
    }
  ],
  documents: [
    {
      id: "doc_1",
      title: "Passport (Republic of India)",
      type: "Identification",
      number: "Z9482710",
      expiryDate: "2032-05-18",
      status: "Valid",
      daysToExpiry: 2078,
      tags: ["Government", "Travel", "Verified"]
    },
    {
      id: "doc_2",
      title: "B.Tech Computer Science Degree Certificate",
      type: "Education",
      number: "DEG-2024-8849",
      expiryDate: "Lifetime",
      status: "Valid",
      tags: ["Degree", "University", "Academic"]
    },
    {
      id: "doc_3",
      title: "Star Health Comprehensive Insurance",
      type: "Insurance",
      number: "SH-99210-2026",
      expiryDate: "2027-03-31",
      status: "Valid",
      daysToExpiry: 203,
      tags: ["Medical", "Policy"]
    },
    {
      id: "doc_4",
      title: "Vehicle Registration Certificate (RC)",
      type: "Vehicle",
      number: "TS09-EX-4421",
      expiryDate: "2026-12-15",
      status: "Expiring Soon",
      daysToExpiry: 97,
      tags: ["Transport", "Renewal Alert"]
    }
  ],
  relationships: [
    {
      id: "rel_1",
      name: "Ananya Sharma",
      role: "Tech Mentor & Principal Architect",
      relationship: "Professional / Mentor",
      birthday: "1994-11-14",
      lastContacted: "2026-09-01",
      notes: "Had a great 1:1 on scaling microservices. Check in every 3 weeks."
    },
    {
      id: "rel_2",
      name: "Mom & Dad",
      role: "Family",
      relationship: "Family",
      birthday: "1972-04-10",
      lastContacted: "2026-09-08",
      notes: "Daily evening video call. Remind Dad about health checkup."
    },
    {
      id: "rel_3",
      name: "Vikram Reddy",
      role: "Co-Founder & College Friend",
      relationship: "Friend & Collaborator",
      birthday: "1999-09-22",
      lastContacted: "2026-09-05",
      notes: "Birthday coming up in 13 days! Plan dinner or surprise."
    }
  ],
  notes: [
    {
      id: "note_1",
      title: "Distributed Systems Caching Patterns",
      category: "Tech & Architecture",
      updatedAt: "2026-09-08T18:30:00Z",
      content: "## Cache-Aside vs Write-Through vs Write-Back\n- **Cache-Aside**: Application is responsible for reading and writing from storage.\n- **Write-Through**: Data is written to cache and immediately to DB in one transaction.\n- **Write-Back**: Write to cache first, write to DB asynchronously with queue."
    },
    {
      id: "note_2",
      title: "2026 Personal Growth & Focus Tenets",
      category: "Philosophy",
      updatedAt: "2026-09-05T09:15:00Z",
      content: "1. Prioritize high-impact deep work over shallow busywork.\n2. Optimize financial savings without compromising essential health and learning.\n3. Keep decisions structured: Evaluate pros, cons, and long-term trajectory."
    }
  ],
  notifications: [
    {
      id: "notif_1",
      type: "urgent",
      title: "Electricity Bill Due Today",
      message: "TSSPDCL Bill of ₹1,420 is due in 10 hours. Tap to clear.",
      time: "10 mins ago",
      read: false
    },
    {
      id: "notif_2",
      type: "reminder",
      title: "Hydration Milestone",
      message: "You've reached 2,250 ml of water today. Just 750 ml left!",
      time: "45 mins ago",
      read: false
    },
    {
      id: "notif_3",
      type: "success",
      title: "Sprint Feature Completed",
      message: "Office Work task marked completed! +50 Life Score points earned 🎉",
      time: "2 hours ago",
      read: true
    }
  ]
};
