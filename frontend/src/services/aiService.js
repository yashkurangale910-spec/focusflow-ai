import { apiClient } from './apiClient';

// Fuzzy matching helper - checks if input is similar to target (handles typos)
// ... (rest of the functions remain the same, but imports change)

// Fuzzy matching helper - checks if input is similar to target (handles typos)
const fuzzyMatch = (input, target) => {
    if (input.includes(target)) return true;

    // Check for common typo patterns - allow 1-2 character differences
    const words = input.split(/\s+/);
    for (const word of words) {
        if (word.length < 3) continue;

        // Quick similarity check - count matching characters
        let matches = 0;
        const shorter = word.length < target.length ? word : target;
        const longer = word.length >= target.length ? word : target;

        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }

        // If 70%+ characters match and similar length, consider it a match
        const similarity = matches / longer.length;
        const lengthRatio = shorter.length / longer.length;

        if (similarity >= 0.6 && lengthRatio >= 0.7) {
            return true;
        }
    }
    return false;
};

// ─── Enhanced Offline Intelligence System ───
// Tracks used responses to avoid repetition
const usedResponses = new Set();
const MAX_TRACKED = 20;

const pickUnique = (arr) => {
    // Filter out recently used responses
    const available = arr.filter(r => !usedResponses.has(r));
    const pool = available.length > 0 ? available : arr;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    usedResponses.add(pick);
    if (usedResponses.size > MAX_TRACKED) {
        const first = usedResponses.values().next().value;
        usedResponses.delete(first);
    }
    return pick;
};

export const getFallbackResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // ── Focus & Concentration ──
    if (fuzzyMatch(lowerMsg, 'focus') || fuzzyMatch(lowerMsg, 'concentrate') || fuzzyMatch(lowerMsg, 'attention') || fuzzyMatch(lowerMsg, 'distract')) {
        return pickUnique([
            "Here's a battle-tested focus protocol:\n\n1. 🎧 Put on brown noise or lo-fi beats\n2. 📱 Phone goes on airplane mode — no exceptions\n3. ⏱️ Set a 25-minute Pomodoro timer\n4. 🎯 Work on ONE single task\n5. ☕ Take a genuine 5-min break after\n\nThe magic is in the constraints. Want to try it now?",
            "Try the **'Environment Reset'** technique:\n\n🔄 Change your physical position (stand up, move rooms)\n💧 Drink a full glass of water\n🖥️ Close ALL tabs except the one you need\n🎵 Put on a 45-min focus playlist\n\nEnvironment shapes behavior more than willpower! 🧠",
            "The **2-Minute Activation** trick works wonders:\n\n⚡ Tell yourself: 'I'll just do 2 minutes'\n🧠 Your brain's activation energy is the hardest part\n🚀 Once you start, momentum carries you\n\n90% of the time, you'll keep going past 2 minutes. The other 10%? You still did something! 💪",
            "**Deep Focus Protocol:**\n\n1. 🚫 Block distracting websites for 45 minutes\n2. 📝 Write down your SINGLE objective on paper\n3. 🎧 Use binaural beats (40Hz for cognitive tasks)\n4. 🕐 Work in 45/15 intervals for complex work\n5. 🏆 Reward yourself after each interval\n\nDeep work is a skill — it gets easier with practice!",
            "Here's what neuroscience says about focus:\n\n🧪 **Ultradian Rhythms**: Your brain naturally cycles in 90-min blocks\n⏰ Work WITH these cycles, not against them\n🌊 Start easy, build intensity, then coast\n☕ Take a real break between cycles\n\nTry aligning your hardest task with your peak energy window (usually 2-4 hours after waking)! 🔬"
        ]);
    }

    // ── Planning & Scheduling ──
    if (fuzzyMatch(lowerMsg, 'schedule') || fuzzyMatch(lowerMsg, 'plan') || fuzzyMatch(lowerMsg, 'calendar') || fuzzyMatch(lowerMsg, 'organize') || fuzzyMatch(lowerMsg, 'routine')) {
        return pickUnique([
            "Here's a powerful daily planning method:\n\n📅 **The 1-3-5 Rule:**\n• 1 Big task (the one that matters most)\n• 3 Medium tasks (important but not huge)\n• 5 Small tasks (quick wins, emails, etc.)\n\nThis keeps your day realistic and focused! What's your Big 1 today?",
            "Try **Time Blocking** for ultimate structure:\n\n🟦 09:00-11:00 → Deep Work (hardest task)\n🟩 11:00-12:00 → Meetings/Collaboration\n🟨 14:00-16:00 → Creative & Strategic work\n🟧 16:00-17:00 → Admin & Quick tasks\n\n⚡ Pro tip: Leave 15-min buffers between blocks for overflow!",
            "The **Ivy Lee Method** (100+ years old, still works!):\n\n1. 📝 At end of day, write tomorrow's 6 most important tasks\n2. 🔢 Number them in priority order\n3. 🎯 Start with #1 tomorrow — don't move until it's done\n4. 🔄 Repeat with #2, #3, etc.\n5. ✨ Move unfinished tasks to tomorrow's list\n\nSimplicity is the ultimate sophistication! 🏛️",
            "**Energy-Based Scheduling** is a game changer:\n\n🌅 Morning (High Energy) → Complex problem-solving, coding\n☀️ Midday (Medium Energy) → Meetings, collaboration, writing\n🌇 Afternoon (Variable) → Routine tasks, email, planning\n🌙 Evening (Low Energy) → Review, light reading, prep for tomorrow\n\nMatch your tasks to your energy, not the clock! ⚡",
            "The **Weekly Reset** ritual:\n\n📋 Every Sunday evening, spend 20 minutes:\n1. Review what you accomplished this week ✅\n2. Identify what got stuck and why 🔍\n3. Set your top 3 goals for next week 🎯\n4. Pre-schedule your Deep Work blocks 📆\n5. Clear your inbox and to-do list 🧹\n\nThis 20-minute investment saves hours! 🚀"
        ]);
    }

    // ── Task Breakdown ──
    if (fuzzyMatch(lowerMsg, 'task') || fuzzyMatch(lowerMsg, 'break down') || fuzzyMatch(lowerMsg, 'breakdown') || fuzzyMatch(lowerMsg, 'subtask') || fuzzyMatch(lowerMsg, 'steps')) {
        return pickUnique([
            "**The Micro-Step Method:**\n\n1. 📝 Write the task as a clear outcome\n2. 🔍 Ask: 'What's the VERY first physical action?'\n3. ⏰ Each micro-step = 10-15 minutes max\n4. ✅ Make each step a verb: 'Open file', 'Write intro paragraph'\n5. 🎯 Focus on just the current step\n\nTell me your task and I'll break it down for you!",
            "Use the **SMART Breakdown**:\n\n🎯 **S**pecific: What exactly needs doing?\n📏 **M**easurable: How will you know it's done?\n🏃 **A**ctionable: What's the first physical step?\n⏰ **R**ealistic: Can each step be done in one sitting?\n📅 **T**imebound: When will each step be finished?\n\nWhat task do you want to break down?",
            "The **Swiss Cheese Method** for big tasks:\n\n🧀 Don't try to eat the whole block at once!\n\n1. Poke holes in it — do any small part you can\n2. 5-minute chunk here, 10-minute chunk there\n3. The task shrinks with each 'hole' you make\n4. Eventually, there's nothing left!\n\nPerfect for tasks that feel overwhelming. What's on your plate?",
            "**Progressive Task Decomposition:**\n\n🔴 Level 1: The Goal (e.g., 'Build a portfolio website')\n🟠 Level 2: Major Phases (Design, Build, Deploy)\n🟡 Level 3: Specific Tasks (Create homepage layout)\n🟢 Level 4: Micro-Actions (Sketch wireframe on paper)\n\n⚡ Always work at Level 4 — the most actionable level!\n\nWhat's your Level 1 goal?",
            "Try the **Done List** approach:\n\n📋 Instead of a to-do list, start with a 'done list':\n\n1. Write down EVERYTHING you accomplish, however small\n2. 'Opened the project file' — counts! ✅\n3. 'Read 2 paragraphs of research' — counts! ✅\n4. 'Wrote one function' — counts! ✅\n\nThis builds momentum and proves you're making progress. Small wins compound! 🏆"
        ]);
    }

    // ── Procrastination & Getting Started ──
    if (fuzzyMatch(lowerMsg, 'procrastinat') || fuzzyMatch(lowerMsg, 'stuck') || lowerMsg.includes("can't start") || fuzzyMatch(lowerMsg, 'lazy') || fuzzyMatch(lowerMsg, 'avoid')) {
        return pickUnique([
            "The **5-Minute Rule** is your best friend:\n\n🎲 Commit to JUST 5 minutes. Set a timer.\n\n🧠 Why it works: Your brain resists *starting*, not *doing*. Once you're 5 minutes in, the activation energy drops and momentum kicks in.\n\n90% of the time, you'll keep going. The other 10%? You still did 5 more minutes than zero! 💪",
            "**Procrastination isn't laziness** — it's an emotion regulation problem.\n\n💡 You're avoiding the *feeling* the task creates, not the task itself.\n\nTry this:\n1. 🏷️ Name the feeling: 'I feel overwhelmed/bored/anxious'\n2. 🤏 Make the task ridiculously small: 'Just open the file'\n3. 🎯 Focus on the PROCESS, not the outcome\n4. 🎉 Celebrate starting, not just finishing\n\nYou've got this! The hardest part is the first 30 seconds.",
            "The **Temptation Bundling** trick:\n\n🎵 Pair the task you're avoiding with something you enjoy:\n\n• Boring report + favorite playlist 🎧\n• Data entry + fancy coffee ☕\n• Exercise + podcast you love 🎙️\n• Study + cozy blanket + candle 🕯️\n\nYour brain needs a reason to start. Give it one! 🧠",
            "**The Momentum Hack:**\n\n🏃 Start with your EASIEST task first (controversial, but hear me out):\n\n1. Quick win → dopamine hit 🎯\n2. Dopamine → motivation boost 🚀\n3. Motivation → tackle harder tasks 💪\n4. Repeat!\n\nSome days, 'eat the frog' doesn't work. On those days, eat the cookie first! 🍪",
            "**Structured Procrastination** (yes, it's a real technique!):\n\n🤔 Put the scary task at the TOP of your list\n📋 Then fill the list with other useful tasks below it\n🧠 Your brain will procrastinate on #1 by doing #2, #3, #4...\n✅ You end up being super productive on everything else!\n\nPlot twist: You're productive while procrastinating! 🎭"
        ]);
    }

    // ── Motivation & Energy ──
    if (fuzzyMatch(lowerMsg, 'motivation') || fuzzyMatch(lowerMsg, 'tired') || fuzzyMatch(lowerMsg, 'energy') || fuzzyMatch(lowerMsg, 'burnout') || fuzzyMatch(lowerMsg, 'exhaust')) {
        return pickUnique([
            "**Quick Energy Reboot Protocol:**\n\n💧 Step 1: Drink a full glass of water NOW\n🚶 Step 2: Stand up and stretch for 60 seconds\n🌬️ Step 3: Take 5 deep breaths (4 in, 7 hold, 8 out)\n🎵 Step 4: Put on your favorite upbeat song\n🎯 Step 5: Pick ONE tiny task and do it\n\nYour body affects your mind more than you think! 🧠",
            "**The Motivation Myth:**\n\n❌ Most people think: Motivation → Action → Results\n✅ Reality: Action → Results → Motivation\n\n🔑 You don't wait for motivation — you generate it BY starting.\n\nJust put on your shoes. Just open the file. Just write one sentence.\n\nMotivation follows action, not the other way around! 🚀",
            "**Energy Management > Time Management:**\n\n⚡ Your energy has 4 dimensions:\n\n1. 🏃 Physical: Sleep, exercise, nutrition, hydration\n2. 😊 Emotional: Positive relationships, gratitude, joy\n3. 🧠 Mental: Focus, creativity, planning\n4. 🎯 Spiritual: Purpose, meaning, values\n\nWhich dimension feels lowest right now? Let's address that first!",
            "**Burnout Recovery Steps:**\n\n🛑 First: This is NOT a failure. Burnout means you cared deeply.\n\n1. 😴 Prioritize sleep above everything else\n2. 🚫 Say NO to non-essential commitments\n3. 🌳 Spend 20 minutes outside daily\n4. 🎮 Do something purely for FUN (no productivity guilt)\n5. 📝 Journal for 5 minutes about what energizes you\n\nRecovery isn't linear. Be patient with yourself. 💙",
            "**The 20-20-20 Energy Rule:**\n\n Every 20 minutes:\n👀 Look at something 20 feet away for 20 seconds\n\nEvery 60 minutes:\n🚶 Walk for 5 minutes\n💧 Drink water\n\nEvery 3 hours:\n🍎 Eat a healthy snack\n🧘 Do a 2-minute breathing exercise\n\nSmall recharges prevent big crashes! ⚡"
        ]);
    }

    // ── Study & Learning ──
    if (fuzzyMatch(lowerMsg, 'study') || fuzzyMatch(lowerMsg, 'learn') || fuzzyMatch(lowerMsg, 'exam') || fuzzyMatch(lowerMsg, 'revise') || fuzzyMatch(lowerMsg, 'homework') || fuzzyMatch(lowerMsg, 'assignment')) {
        return pickUnique([
            "**Active Recall** — the #1 study technique:\n\n📖 Don't just re-read notes. Instead:\n1. Close your book/notes\n2. Write everything you remember\n3. Check what you missed\n4. Focus on the gaps\n5. Repeat!\n\n🧠 This is 3x more effective than passive reading. Your brain learns by RETRIEVING, not reviewing!",
            "**Spaced Repetition** schedule:\n\n📅 Review material at these intervals:\n• After 1 day\n• After 3 days\n• After 7 days\n• After 14 days\n• After 30 days\n\n⚡ Each review takes less time but locks it in deeper. This is how memory works!\n\nTip: Use flashcards and sort them by difficulty 🃏",
            "**The Feynman Technique** (learn anything fast):\n\n1. 📝 Write the concept name at top of a page\n2. 🗣️ Explain it in SIMPLE words, as if teaching a 12-year-old\n3. 🔍 When you get stuck, go back to the source material\n4. 🔄 Simplify your explanation even more\n\nIf you can't explain it simply, you don't understand it yet! 🎓",
            "**Pomodoro Study Blocks:**\n\n📚 25 min study → 5 min break (×4)\n🧘 Then 15-30 min longer break\n\nDuring each 25-min block:\n• NO phone, NO social media\n• Focus on ONE subject/topic\n• Take brief notes in your own words\n\nAfter 4 blocks, you've done 100 quality minutes! That's huge! 🏆",
            "**Study Environment Optimization:**\n\n🖥️ Set up a dedicated study space\n🎧 Use brown noise or nature sounds\n📱 Phone in another room (not just silent!)\n💡 Good lighting reduces fatigue\n🌡️ Slightly cool temperature keeps you alert\n💧 Water bottle within reach\n\n📊 Studies show environment accounts for 40% of your focus ability! 🏠"
        ]);
    }

    // ── Stress & Anxiety ──
    if (fuzzyMatch(lowerMsg, 'stress') || fuzzyMatch(lowerMsg, 'anxiety') || fuzzyMatch(lowerMsg, 'overwhelm') || fuzzyMatch(lowerMsg, 'panic') || fuzzyMatch(lowerMsg, 'worry')) {
        return pickUnique([
            "**5-4-3-2-1 Grounding Technique:**\n\nRight now, notice:\n👀 5 things you can SEE\n✋ 4 things you can TOUCH\n👂 3 things you can HEAR\n👃 2 things you can SMELL\n👅 1 thing you can TASTE\n\nThis pulls your brain back to the present moment. You're safe right here, right now. 💙",
            "**The Brain Dump:**\n\n📝 Set a 5-minute timer and write down EVERYTHING on your mind:\n• Tasks, worries, random thoughts, feelings, ideas\n• Don't organize, don't judge, just dump it ALL\n\n🧠 Your working memory can only hold ~4 items. When it's overloaded, you feel overwhelmed.\n\nGetting it on paper = freeing mental RAM! 💾",
            "**Box Breathing** for instant calm:\n\n⬜ Breathe IN for 4 seconds\n⬜ HOLD for 4 seconds\n⬜ Breathe OUT for 4 seconds\n⬜ HOLD for 4 seconds\n\n🔄 Repeat 4 times\n\n🧪 Used by Navy SEALs to stay calm under pressure. It activates your parasympathetic nervous system within 60 seconds! 🧘",
            "**Worry Time** technique:\n\n⏰ Schedule 15 minutes of 'worry time' each day\n📝 During that time, worry as much as you want!\n🚫 Outside that window, when worries come up, write them down and say: 'I'll think about this during worry time'\n\n🧠 This trains your brain that worrying has a time and place — and it's not ALL the time! 🎯",
            "**The 10/10/10 Rule** for perspective:\n\nWhen stressed, ask yourself:\n\n🔟 Will this matter in 10 minutes?\n🔟 Will this matter in 10 months?\n🔟 Will this matter in 10 years?\n\n95% of our daily stressors fail the 10/10/10 test. This isn't minimizing your feelings — it's putting them in context. You've survived 100% of your worst days so far! 💪"
        ]);
    }

    // ── Habits & Routines ──
    if (fuzzyMatch(lowerMsg, 'habit') || fuzzyMatch(lowerMsg, 'routine') || fuzzyMatch(lowerMsg, 'morning') || fuzzyMatch(lowerMsg, 'evening') || fuzzyMatch(lowerMsg, 'daily') || fuzzyMatch(lowerMsg, 'consistent')) {
        return pickUnique([
            "**Habit Stacking** (attach new habits to existing ones):\n\n🔗 Formula: 'After I [CURRENT HABIT], I will [NEW HABIT]'\n\nExamples:\n• After I pour morning coffee → I review today's priorities\n• After I sit at my desk → I write 3 things I'm grateful for\n• After I close my laptop → I plan tomorrow's top 3 tasks\n\nPiggyback on existing neural pathways! 🧠",
            "**The 2-Minute Rule** for building habits:\n\n🎯 Scale any habit down to 2 minutes:\n\n• 'Read 30 pages' → 'Read one page'\n• 'Run 3 miles' → 'Put on running shoes'\n• 'Study for 2 hours' → 'Open my notes'\n\n🔑 The point isn't the 2 minutes — it's becoming the type of person who shows up every day. Identity > outcomes! ✨",
            "**Morning Routine Blueprint:**\n\n🌅 The first 60 minutes set your entire day:\n\n1. ❌ No phone for first 30 minutes\n2. 💧 Hydrate immediately\n3. ☀️ Get sunlight exposure (even 5 min)\n4. 🧘 5-minute meditation or journaling\n5. 🎯 Review your top 3 priorities\n6. 🏃 10 minutes of movement\n\nConsistency beats intensity. Same routine, every day! 📆",
            "**Habit Tracking** made simple:\n\n📊 Don't break the chain!\n\n• Use a simple calendar or app\n• Mark an X for each day you do the habit\n• Your only goal: don't break the chain\n\n⚡ Visual progress = dopamine = motivation\n\nRule: Never miss twice in a row. One miss is an accident. Two is the start of a new (bad) habit! 🔗",
            "**The 4 Laws of Behavior Change:**\n\n1. 🔍 Make it OBVIOUS — Put your running shoes by the door\n2. 😍 Make it ATTRACTIVE — Pair it with something you enjoy\n3. 🤏 Make it EASY — Start with 2 minutes\n4. 🎉 Make it SATISFYING — Track your streak\n\nTo break a bad habit, invert the laws:\n❌ Make it invisible, unattractive, difficult, unsatisfying! 🔄"
        ]);
    }

    // ── Greetings & General Chat ──
    if (fuzzyMatch(lowerMsg, 'hello') || fuzzyMatch(lowerMsg, 'hi') || fuzzyMatch(lowerMsg, 'hey') || fuzzyMatch(lowerMsg, 'sup') || lowerMsg === 'yo' || fuzzyMatch(lowerMsg, 'good morning') || fuzzyMatch(lowerMsg, 'good evening')) {
        return pickUnique([
            "Hey there! 👋 Neural link is active and ready.\n\nI can help you with:\n🎯 Breaking down tasks\n⏱️ Focus techniques\n📅 Planning your day\n💡 Beating procrastination\n🧘 Managing stress\n\nWhat would you like to work on?",
            "Hello, Pioneer! ⚡ Your Neural Coach is online.\n\nQuick actions available:\n• 'Plan my day' — I'll help structure your time\n• 'I'm stuck' — Procrastination-busting techniques\n• 'Break down [task]' — Micro-step generation\n\nWhat's on your mind today? 🧠",
            "Welcome back! 🚀 Ready to optimize your day?\n\nTip: Try one of the quick actions above, or just tell me what you're working on and I'll help you find the best approach! 💪"
        ]);
    }

    // ── Thank You / Positive ──
    if (fuzzyMatch(lowerMsg, 'thanks') || fuzzyMatch(lowerMsg, 'thank you') || fuzzyMatch(lowerMsg, 'great') || fuzzyMatch(lowerMsg, 'awesome') || fuzzyMatch(lowerMsg, 'nice') || fuzzyMatch(lowerMsg, 'cool')) {
        return pickUnique([
            "You're welcome! 🌟 Remember — progress, not perfection. Every small step counts!\n\nAnything else I can help with? I'm here whenever you need a boost! 💪",
            "Glad I could help! ⚡ Keep that momentum going!\n\n💡 Pro tip: When you finish a task, take 30 seconds to acknowledge the win before moving on. Your brain needs those micro-celebrations! 🎉",
            "Anytime! 🚀 You're doing great. Consistency is the real superpower.\n\nFeel free to come back whenever you need a focus boost, task breakdown, or just a quick pep talk! 🧠"
        ]);
    }

    // ── Productivity Tools & Techniques ──
    if (fuzzyMatch(lowerMsg, 'productiv') || fuzzyMatch(lowerMsg, 'efficien') || fuzzyMatch(lowerMsg, 'technique') || fuzzyMatch(lowerMsg, 'method') || fuzzyMatch(lowerMsg, 'system') || fuzzyMatch(lowerMsg, 'tool')) {
        return pickUnique([
            "**Top 5 Productivity Techniques:**\n\n1. ⏱️ **Pomodoro** — 25 min work / 5 min break\n2. 🐸 **Eat the Frog** — Do hardest task first\n3. 📦 **Time Boxing** — Fixed time per task\n4. 🔢 **Eisenhower Matrix** — Urgent vs Important\n5. 🎯 **Getting Things Done** — Capture → Process → Do\n\nWhich one interests you? I can go deeper on any! 🤓",
            "**The Eisenhower Matrix** for priority clarity:\n\n🔴 Urgent + Important → DO IT NOW\n🟡 Important + Not Urgent → SCHEDULE IT\n🟠 Urgent + Not Important → DELEGATE IT\n⚪ Not Urgent + Not Important → DELETE IT\n\n80% of your results come from 20% of your tasks. Find that 20%! 📊",
            "**Batching** — the underrated productivity hack:\n\n📧 Check emails at 10am, 2pm, 5pm (not constantly)\n📱 Social media: one 15-min block per day\n📞 Calls: group them into one afternoon block\n✍️ Writing: dedicated morning sessions\n\n🧠 Context switching costs 23 minutes per switch. Batching eliminates this! ⚡",
            "**The ABCDE Method:**\n\n🅰️ Must do — serious consequences if not done\n🅱️ Should do — mild consequences if not done\n©️ Nice to do — no real consequences\n🅳️ Delegate — someone else can do this\n🅴️ Eliminate — not worth doing at all\n\nLabel every task on your list, then start with all A's! 🎯"
        ]);
    }

    // ── Continuation / Follow-up ──
    if (lowerMsg === 'then' || lowerMsg === 'next' || lowerMsg === 'and then' || lowerMsg === 'what next' || lowerMsg === 'after that' || lowerMsg === 'more' || lowerMsg === 'tell me more' || lowerMsg === 'what else' || lowerMsg === 'continue' || lowerMsg === 'go on') {
        return pickUnique([
            "Here's the next level:\n\n⏱️ Set a timer for 25 minutes and work on JUST that one task. When it goes off, take a genuine 5-minute break — move around, hydrate, look away from the screen.\n\nAfter 4 rounds, take a 20-minute break. This is the Pomodoro method! 🍅\n\nShall we try this now?",
            "Building on that — here are advanced tips:\n\n💪 Make your workspace 'friction-free':\n• Remove ALL notifications\n• Use a single monitor if possible\n• Have water and snacks ready\n• Tell others you're in 'focus mode'\n\n🔑 The less friction to start, the more likely you'll start! Which of these can you do right now?",
            "Great momentum! Here's another layer:\n\n🧠 **Implementation Intentions:**\nInstead of 'I'll work on my project', say:\n'At 2pm, at my desk, I will open my project and write the first paragraph'\n\n📊 Studies show this doubles your follow-through rate! Specificity beats vague intentions every time. ⚡",
            "Here's an extra technique:\n\n🎵 Use **body doubling** — work alongside someone:\n• Virtual: Leave a video call open with a study buddy\n• IRL: Go to a coffee shop or library\n• App: Try FocusFlow's Community tab!\n\n🧠 Just having someone nearby doing work triggers your mirror neurons and boosts accountability! 👥"
        ]);
    }

    // ── Default (catch-all with variety) ──
    return pickUnique([
        "Great question! Here's a quick tip:\n\n📋 Break your task into chunks of 10-15 minutes each. This makes anything feel manageable!\n\n🧠 Your brain processes small tasks as 'easy wins' and releases dopamine, creating a positive feedback loop. 🎯",
        "Here's a power tip:\n\n⚡ The **2-Minute Rule**: If something takes less than 2 minutes, do it NOW. Don't add it to a list, don't schedule it — just do it.\n\nThis prevents tiny tasks from piling up into an overwhelming mountain! 🏔️",
        "Let's tackle this together! 🚀\n\nWhat's the ONE most important thing you need to finish today? Name it, and I'll help you:\n• Break it into micro-steps\n• Find the best focus technique\n• Build a game plan\n\nSometimes just saying it out loud helps! 💬",
        "Focus tip for right now:\n\n📱 Put your phone in another room\n⏱️ Set a 25-min timer\n🎯 Pick ONE task\n💭 Tell yourself: 'Just this one session'\n\nThat's it. Simple beats complex every time. You've got this! 💪",
        "Here's something most people don't know:\n\n🧠 Your brain has a **default mode network** that activates when you're NOT focused. It's responsible for mind-wandering.\n\n🎯 To switch to **task-positive mode**:\n1. Set a clear intention ('I will do X')\n2. Remove visual distractions\n3. Start with a tiny action\n\nOnce you're in the zone, the network switches automatically! ⚡",
        "Let me share the **Progress Principle:**\n\n📈 Research shows the #1 motivator at work is making PROGRESS on meaningful tasks.\n\nNot rewards. Not recognition. Just progress.\n\n✅ So track your wins, no matter how small:\n• 'Wrote 200 words' → progress!\n• 'Fixed one bug' → progress!\n• 'Organized my notes' → progress!\n\nEvery step forward counts! 🏆",
        "Try the **If-Then Planning** technique:\n\n🔮 'IF [situation], THEN [action]'\n\nExamples:\n• IF I feel like checking social media → THEN I'll drink water instead\n• IF I finish one Pomodoro → THEN I'll stretch for 2 minutes\n• IF I feel overwhelmed → THEN I'll write down my top 3 priorities\n\nPre-deciding removes willpower from the equation! 🧠",
        "**The 3-3-3 Method** for daily focus:\n\n🔵 3 hours of deep work on your most important project\n🟢 3 shorter tasks (30 min each)\n🟡 3 maintenance activities (email, planning, etc.)\n\nThis ensures you make meaningful progress while still handling the small stuff! 📊"
    ]);
};

export const chatWithAI = async (messages, systemPrompt = null) => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';

    const defaultSystemPrompt = `You are a friendly, supportive productivity coach for FocusFlow AI.
Keep responses concise, warm, and encouraging. Use emojis occasionally.`;

    try {
        const data = await apiClient('/ai/chat', {
            method: 'POST',
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt || defaultSystemPrompt },
                    ...messages,
                ],
            }),
        });

        return data.message || getFallbackResponse(lastUserMessage);
    } catch (error) {
        console.warn('AI API Error, using fallback:', error.message);
        return getFallbackResponse(lastUserMessage);
    }
};

export const breakDownTask = async (taskTitle, taskDescription = '') => {
    const prompt = `Break down this task into 3-5 tiny, actionable micro-steps. Be specific and realistic.

Task: ${taskTitle}
${taskDescription ? `Details: ${taskDescription}` : ''}

Format each step like:
1. [Step description] (estimated time)

Keep it simple and approachable!`;

    return await chatWithAI([{ role: 'user', content: prompt }]);
};

export const getFocusRecommendation = async (taskTitle, userContext = '') => {
    const prompt = `Based on this task, suggest:
1. Ideal focus session length (Pomodoro/Deep Focus/Custom)
2. One specific tip for staying focused on this type of work

Task: ${taskTitle}
${userContext ? `Context: ${userContext}` : ''}

Keep it brief and actionable!`;

    return await chatWithAI([{ role: 'user', content: prompt }]);
};
export const triageTasks = async (tasks) => {
    if (!tasks || tasks.length === 0) return [];

    const taskList = tasks.map((t, i) => `${i + 1}. ${t.title} (${t.priority} priority)`).join('\n');
    const prompt = `As a Neural Coach for ADHD users, reorder these tasks based on the "INCUP" model (Interest, Novelty, Challenge, Urgency, Proximity).
    
    Current Tasks:
    ${taskList}

    Return a JSON array of the task TITLES ONLY, sorted from most engaging/critical to least.
    Example format: ["Task A", "Task B", "Task C"]
    
    IMPORTANT: Return ONLY the JSON array.`;

    try {
        const response = await chatWithAI([{ role: 'user', content: prompt }], "You are a specialized ADHD task prioritization engine. Respond ONLY with valid JSON.");
        // Try to find the JSON array in the response
        const jsonMatch = response.match(/\[.*\]/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return tasks.map(t => t.title); // Fallback to original order
    } catch (error) {
        console.error('Triage failed:', error);
        return tasks.map(t => t.title);
    }
};
