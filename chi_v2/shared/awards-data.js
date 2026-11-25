/*
 * Award-winning papers — shared by Awards, Map (room schedules) and My.
 * Paper list, rooms and session names are the CHI 2026 Best Papers, re-dated onto the CHI 2027 week
 * (Mon May 10 – Fri May 14, 2027) for this prototype.
 */
(function () {
  'use strict';
  var A = '3772318.';
  // [title, topic, day, start, end, room, session, authors, doi, summary]
  var P = [
      ["A Cantilevered DeltaXY Positioning Mechanism Enabling Rackable Digital Fabrication Form Factors", 'sys', 'Tue', '13:15', '14:45', 'P1 · Room 133', 'Interactive Design Systems for Fabrication', 'Ilan Moyer, Leo McElroy, Quentin Bolsée et al.', A + '3791468', "Narrow, deep “rackable” fabrication machines that fit places a desktop machine can’t."],
      ["A decision-theoretic representation of assistive interfaces", 'sys', 'Thu', '13:15', '14:45', 'P1 · Room 116', 'Optimizing Interactive Systems', 'Julien Gori, Aurelien Nioche, Christoph Johns et al.', A + '3791819', ''],
      ["AI Sensing and Intervention in Higher Education: Student Perceptions of Learning Impacts, Affective Responses, and Ethical Priorities", 'learn', 'Tue', '13:15', '14:45', 'P1 · Room 120', 'Generative AI in Education', 'Bingyi Han, Ying Ma, Simon Coghlan et al.', A + '3790360', "132 university students react to AI that senses their attention and emotions in class."],
      ["AI That Moves With You: A Review of Interactive Technologies Powered by Large Foundation Models for Mobility Impairment", 'acc', 'Wed', '11:00', '12:30', 'P1 · Room 132', 'Practical and Adaptive Accessibility', 'Duosi Dai, Yuchong Zhang, Yong Ma et al.', A + '3791239', ''],
      ["Are Semantic Networks Associated with Idea Originality in Artificial Creativity? A Comparison with Human Agents", 'ai', 'Fri', '13:15', '14:45', 'P1 · Room 128', 'Modeling Minds and Mentalities', 'Umberto Domanti, Lorenzo Campidelli, Sergio Agnoli et al.', A + '3790849', ''],
      ["Becoming Watchful on the Trail and at Home: Understanding Experiential Outcomes of Capra in Long-Term Use", 'home', 'Wed', '11:00', '12:30', 'P1 · Room 134', 'Tech in Nature', 'William Odom, Samuel Barnett, Jordan White et al.', A + '3790407', ''],
      ["Bloom: Designing for LLM-Augmented Behavior Change Interactions", 'health', 'Wed', '13:15', '14:45', 'P1 · Room 111', 'Physical Activity and Behavior Change Technologies', 'Matthew Jörke, Defne Genç, Valentin Teutschbein et al.', A + '3790506', "A physical-activity app that pairs an LLM health coach with proven behavior-change design."],
      ["BRIDGE: Borderless Reconfiguration for Inclusive and Diverse Gameplay Experience via Embodiment Transformation", 'games', 'Thu', '13:15', '14:45', 'P1 · Room 117', 'Novel Approaches to VR & Games', 'Hayato Saiki, Chunggi Lee, Hikari Takahashi et al.', A + '3790805', ''],
      ["Characterizing Scam-Driven Human Trafficking Across Chinese Borders and Online Community Responses on RedNote", 'soc', 'Tue', '11:00', '12:30', 'P1 · Room 134', 'Scam Experiences', 'Jiamin Zheng, Yue Deng, Jessica Chen et al.', A + '3791786', ''],
      ["Chasing Meaning and/or Insight? A Survey on Evaluation Practices at the Intersection of Visualization and the Humanities", 'data', 'Fri', '11:00', '12:30', 'P1 · Room 113', 'People and Data', 'Alejandro Benito-Santos, Florian Windhager, Aida Horaniet Ibañez et al.', A + '3793150', ''],
      ["Civil Data Disobedience: Navigating Data Interaction Challenges in Human Rights Defense Organizations", 'soc', 'Wed', '13:15', '14:45', 'Auditorium', 'Algorithmic Power, Justice and Repression', 'Maria Normark, Karin Hansson, Mattias Jacobsson', A + '3791764', ''],
      ["CoBRA: Programming Cognitive Bias in Social Agents Using Classic Social Science Experiments", 'ai', 'Tue', '11:00', '12:30', 'P1 · Room 122', 'AI Systems for Human Goals', 'Xuan Liu, HaoYang Shang, Haojian Jin', A + '3790804', ''],
      ["Cocoa: Co-Planning and Co-Execution with AI Agents", 'ai', 'Tue', '11:00', '12:30', 'P1 · Room 128', 'AI Collaboration in Practice', 'K. J. Kevin Feng, Kevin Pu, Matt Latzke et al.', A + '3791673', "People and AI agents plan and carry out long tasks together, instead of people only fixing agent mistakes."],
      ["Crafting Remembrance Beyond the Self: Older Adults’ Digital and Material Legacies", 'home', 'Wed', '11:00', '12:30', 'P1 · Room 125', 'Aging and Later Life', 'Ramprabu Thangaraj, Jed Brubaker, Emma Dixon et al.', A + '3791813', "How older adults choose the digital and physical things that will shape how they are remembered."],
      ["Designing for Long-Term Emotion Regulation: A Breathing Biofeedback Game for Women in Compulsory Isolation Drug Rehabilitation Centers", 'health', 'Thu', '13:15', '14:45', 'P1 · Room 117', 'Novel Approaches to VR & Games', 'Qi Chen, Jiachen Du, Zhihao Yao et al.', A + '3790574', ''],
      ["Do Children Trust AI, and Should They? Designing and Validating a Child-Centred K-AI Trust Scale for Intelligent Systems", 'ai', 'Thu', '13:15', '14:45', 'Auditorium', 'AI-Assisted Clinical Diagnosis and Reasoning', 'Grazia Ragone, Paolo Buono, Judith Good et al.', A + '3790765', ''],
      ["Friend, Foe, or Bot? Exploring Intergroup Dynamics in Hybrid Human-Bot Teams", 'ai', 'Wed', '13:15', '14:45', 'P1 · Room 114', 'Synergistic with AI', 'Assem Zhunis, Ziqi Pan, Yuanhao Zhang et al.', A + '3791939', ''],
      ["From Overload to Convergence: Supporting Multi-Issue Human–AI Negotiation with Bayesian Visualization", 'ai', 'Tue', '11:00', '12:30', 'P1 · Room 128', 'AI Collaboration in Practice', 'Mehul Parmar, Chaklam Silpasuwanchai', A + '3790358', ''],
      ["From Preference to Performance: Patient-Centered Design of Multimodal Cueing in Parkinson’s Disease Gait Training", 'health', 'Fri', '13:15', '14:45', 'P1 · Room 111', 'Movement and Going Places', 'Xinjin Li, Wenjie Wang, Kai Wang et al.', A + '3791182', ''],
      ["From Using to Infrastructuring: Grassroots VPN-Building in Iran’s Women–Life–Freedom Movement", 'soc', 'Thu', '11:00', '12:30', 'P1 · Room 115', 'Technology for Social Impact', 'Sarvin Qalandar, Philip Engelbutzeder, Dave Randall et al.', A + '3790369', ''],
      ["Generative Muscle Stimulation: Providing Users with Physical Assistance by Constraining Multimodal-AI with Embodied Knowledge", 'xr', 'Thu', '11:00', '12:30', 'M2 · Room M211/212', 'Electrical Stimulation', 'Yun Ho, Romain Nith, Peili Jiang et al.', A + '3790817', ''],
      ["GeoVisA11y: An AI-based Geovisualization Question-Answering System for Screen-Reader Users", 'acc', 'Fri', '11:00', '12:30', 'P1 · Room 120', 'Designing for Sensory Access', 'Chu Li, Rock Pang, Arnavi Chheda-Kothary et al.', A + '3790334', "Screen-reader users can ask questions about maps in plain language, answered by an LLM."],
      ["How are Vibrotactile Experiences Visually Represented? A Taxonomy of Illustration Characteristics", 'xr', 'Thu', '13:15', '14:45', 'P1 · Room 113', 'Reflecting on Haptics', 'Bruno Fruchard, Dennis Wittchen, Nihar Sabnis et al.', A + '3790598', ''],
      ["How They Type: Eye and Finger Movement Strategies in Typing of Individuals with Cerebral Palsy", 'acc', 'Thu', '11:00', '12:30', 'P1 · Room 117', 'Assistive Tech and Professional Inclusion', 'Tingting Song, Liangyue Han, Yunfei Bi et al.', A + '3791184', ''],
      ["Interactive Explainable Ranking", 'data', 'Thu', '13:15', '14:45', 'Area 1+2+3 · Theatre', 'Explaining and Evaluating AI Systems', 'Chao Zhang, Abe Davis', A + '3790810', ''],
      ["iTagPDF: Towards Finally Automating PDF Accessibility", 'acc', 'Fri', '11:00', '12:30', 'P1 · Room 125', 'Non-visual and conversational experiences', 'Peya Mowar, Aaron Steinfeld, Jeffrey Bigham', A + '3790289', "Tags PDFs by meaning rather than by layout, so research papers work better with screen readers."],
      ["Let's Make a Community [of Practice]: Using Community-Based Participatory Design to Support Interdependence", 'acc', 'Wed', '11:00', '12:30', 'P1 · Room 125', 'Aging and Later Life', 'Elaine Czech, Dan Bennett, Grace Stangroome et al.', A + '3790423', ''],
      ["Localized Imaginaries, Global Assets: Sociotechnical Imaginaries and the Assetization of Data Centers in Singapore", 'soc', 'Wed', '11:00', '12:30', 'P1 · Room 117', 'Context-specific Studies and Perspectives', 'Tanmaie Kailash, Cindy Lin', A + '3790854', ''],
      ["Managing Medication Plans When Information Is Scattered: Clinicians' Strategies and Tools", 'health', 'Thu', '11:00', '12:30', 'P1 · Room 129', 'Health Tools and Technologies', 'Anastasiya Zakreuskaya, Ignacio Avellino, Wendy Mackay', A + '3790884', ''],
      ["Mining Player Experience Trends From Game Reviews Using Large Language Models", 'games', 'Tue', '11:00', '12:30', 'P1 · Room 114', 'Designing Player Experience', 'Supriya Dutta, Joel Oksanen, Jaakko Väkevä et al.', A + '3790760', ''],
      ["MlondaCam: Designing Context-Aware Smart Cameras for Supporting Domestic Security and Privacy in Malawian Homes", 'home', 'TBA', '', '', 'Room to be announced', 'Not yet scheduled', 'George Chidziwisano, Yewande Ojo, Thandiwe Jere', A + '3791816', ''],
      ["Narratives and Perspectives: How AI Summaries Steer Users' Opinions and Engagement on Social Media", 'ai', 'Thu', '11:00', '12:30', 'P1 · Room 114', 'Social Media Feeds and Algorithms', 'Jarod Govers, Cherie Sew, Eduardo Velloso et al.', A + '3790945', "In a 144-person experiment, AI summaries of online discussions shifted people’s opinions."],
      ["Novobo: Supporting Teachers' Peer Learning of Instructional Gestures by Teaching a Mentee AI-Agent Together", 'learn', 'Fri', '13:15', '14:45', 'P1 · Room 117', 'AI Tutors and Learning Support Systems', 'Jiaqi Jiang, Kexin Huang, Huan Zeng et al.', A + '3791469', ''],
      ["PerEye: Co-Designing Extended Reality Rendering Attributes for Vision Health Diagnosis and Education", 'health', 'Thu', '13:15', '14:45', 'P1 · Room 131', 'Designing Care Futures', 'Howe Zhu, Jacinta Walz, Nguyen Thanh Trung Le et al.', A + '3791349', ''],
      ["PleaSQLarify: Visual Pragmatic Repair for Natural Language Database Querying", 'data', 'Tue', '11:00', '12:30', 'P1 · Room 130', 'Personalization and Human-AI Alignment', 'Robin Chan, Rita Sevastjanova, Mennatallah El-Assady', A + '3791265', ''],
      ["Promise or Peril? Exploring Black Adults' Perspectives on the Use of Artificial Intelligence in Health Contexts", 'health', 'Fri', '13:15', '14:45', 'P1 · Room 124', 'Health Equity and Underserved Populations', 'Andrea Parker, Laura Vardoulakis, Christina Harrington', A + '3791451', ''],
      ["RAG Without the Lag: Enabling \"What-If\" Analysis for Retrieval-Augmented Generation Pipelines", 'ai', 'Tue', '11:00', '12:30', 'P1 · Room 125', 'Conversational AI', 'Quentin Romero Lauro, Shreya Shankar, Sepanta Zeighami et al.', A + '3790874', ''],
      ["Reacquainting with Everyday Urban Nature: Exploring Natural Soundscape Restoration with Personal Audio AR", 'xr', 'Mon', '13:15', '14:45', 'P1 · Room 119', 'Animals & Nature', 'Yu Chen, Yu-Cheng Chang, Yu Lun Hsu et al.', A + '3791961', "Personal audio AR brings natural sounds back into city life, helping people reconnect with nearby nature."],
      ["Scene2Hap: Generating Scene-Wide Haptics for VR from Scene Context with Multimodal LLMs", 'xr', 'Mon', '13:15', '14:45', 'P1 · Room 118', 'Haptic and Multisensory Feedback', 'Arata Jingu, Easa AliAbbasi, Sara Safaee et al.', A + '3791297', "A multimodal LLM designs vibration feedback for every object in a VR scene automatically."],
      ["Sensemaking in User-Driven Algorithm Auditing: A Case Study on Gender Bias in an Image Captioning Model", 'soc', 'Tue', '13:15', '14:45', 'P1 · Room 130', 'Sensemaking', 'Behnoosh Mohammadzadeh, Jules Françoise, Michèle Gouiffès et al.', A + '3790784', ''],
      ["Sex after Cancer: Co-Designing Bespoke Care Technologies for Post-Cancer Bodies", 'health', 'Wed', '13:15', '14:45', 'P1 · Room 113', 'Bodies, Care & More Than Human Places', 'Céline Offerman, Francesca Maria Mauri, Alessandro Bozzon et al.', A + '3790355', ''],
      ["Small Talk, Big Impact? LLM-based Conversational Agents to Mitigate Passive Fatigue in Conditional Automated Driving", 'ai', 'Thu', '11:00', '12:30', 'P1 · Room 130', 'Context-aware Interfaces for Mobility & Automation', 'Lewis Cockram, Yueteng Yu, Jorge Pardo et al.', A + '3790972', ''],
      ["Sound2Hap: Learning Audio-to-Vibrotactile Haptic Generation from Human Ratings", 'xr', 'Mon', '13:15', '14:45', 'P1 · Room 118', 'Haptic and Multisensory Feedback', 'Yinan Li, Hasti Seifi', A + '3790649', ''],
      ["Starting From Scratch Again and Again: Tracing the Origins of High Schoolers’ Negative Perceptions of Block-Based Programming", 'learn', 'Thu', '13:15', '14:45', 'P1 · Room 114', 'AI, Learning and Inclusion in Education', 'Caryn Tran, Kristin Fasiang, Max Kanwal et al.', A + '3791825', ''],
      ["Stress Mindset Matters: Rethinking Mental Stress Detection with Multimodal Wearable Sensors", 'health', 'Fri', '11:00', '12:30', 'P1 · Room 132', 'Mindfulness, Breathing, and Biofeedback Technologies', 'Lakmal Meegahapola, Marios Constantinides, Zoran Radivojevic et al.', A + '3791340', ''],
      ["The Words That Can't Be Shared: Exploring the Design of Unsent Messages", 'home', 'Fri', '11:00', '12:30', 'P1 · Room 124', 'Expression and Affective Wellbeing', 'Michael Yin, Robert Xiao', A + '3790639', "Looks at the messages people write in anger, guilt or longing but never send."],
      ["ThreeTopo: Focused Interactive Navigation for Multi-Pitch Rock Climbing", 'xr', 'Wed', '13:15', '14:45', 'Area 1+2+3 · Theatre', 'XR Navigation', 'Ben Pearman, Kurtis Danyluk, Wesley Willett', A + '3791544', ''],
      ["Touching Emotions, Smelling Shapes: Exploring Tactile, Olfactory and Emotional Cross-sensory Correspondences in Preschool-aged Children", 'xr', 'Fri', '13:15', '14:45', 'P1 · Room 112', 'VR AR XR', 'Tegan Roberts-Morgan, Min Li, Priscilla Lo et al.', A + '3790709', ''],
      ["Towards Fluent Interaction with Cyber-Physical Architecture", 'sys', 'Tue', '11:00', '12:30', 'P1 · Room 128', 'AI Collaboration in Practice', 'Jesse Gonzalez, Neeta Khanuja, Michael Li et al.', A + '3791787', ''],
      ["Trauma-Informed Digital Evidence Collection: A Design Inquiry into Evidence Practices for Technology-Facilitated Abuse in Intimate Partner Violence", 'soc', 'Wed', '13:15', '14:45', 'P1 · Room 115', 'Privacy, Health and Gender', 'Sophie Stephenson, Naman Gupta, Kyle Huang et al.', A + '3790296', ''],
      ["Unit-Less Measurements with StoryStick++: Rethinking Measurement as Interactive Processes", 'sys', 'Mon', '20:00', '21:30', 'Area 1+2+3 · Demos', 'Reception and Interactivity Demos', 'Stig Konings, Maties Claesen, Danny Leen et al.', '3772363.3799173', ''],
      ["When Plants Play: Rethinking Plant Materiality in Digital Games", 'games', 'Tue', '11:00', '12:30', 'P1 · Room 121', 'More-than-Human & Multispecies Design', 'Yoonji Lee, Chang Hee Lee', A + '3791373', ''],
      ["When Scaffolding Breaks: Investigating Student Interaction with LLM-Based Writing Support in Real-Time K-12 EFL Classrooms", 'learn', 'Fri', '11:00', '12:30', 'P1 · Room 111', 'Human-in-the-Loop Machine Learning Interfaces', 'Junho Myung, Hyunseung Lim, Hana Oh et al.', A + '3791517', ''],
      ["When Workout Buddies Are Virtual: AI Agents and Human Peers in a Longitudinal Physical Activity Study", 'health', 'Wed', '13:15', '14:45', 'P1 · Room 111', 'Physical Activity and Behavior Change Technologies', 'Alessandro Silacci, Mauro Cherubini, Arianna Boldi et al.', A + '3790303', ''],
      ["Who Controls the Conversation? User Perspectives On Generative AI (LLM) System Prompts", 'ai', 'Wed', '11:00', '12:30', 'P1 · Room 114', 'Conversational AI, Agency and Control', 'Anna Neumann, Yulu Pi, Jatinder Singh', A + '3791726', ''],
      ["With Visual Integrity and Care: A Framework for Mixed Methods Research on Visual Social Data", 'data', 'Wed', '11:00', '12:30', 'P1 · Room 112', 'Design Methods and Frameworks', 'Nina Lutz, Joseph Schafer, Priya Dhawka et al.', A + '3791623', ''],
      ["Writing with AI Can Reduce Gender Bias in Hiring Evaluations", 'ai', 'Mon', '13:15', '14:45', 'P1 · Room 114', 'Gendered Experiences', 'Alicia Liu, Mina Lee, Xuechunzi Bai', A + '3791136', "A 672-person experiment finds that writing with an AI assistant can reduce gender bias when judging résumés."],
      ["µCap: Instrumental Music Captions for Deaf and Hard-of-Hearing Individuals", 'acc', 'Fri', '11:00', '12:30', 'P1 · Room 120', 'Designing for Sensory Access', 'SooYeon Ahn, In-Chang Baek, KyungJoong Kim et al.', A + '3790729', "Automatic captions for instrumental music, so Deaf and hard-of-hearing audiences can follow its mood."],
      ["\"An Experience That Could Not be Found Anywhere Else\": Resonance as an Explanatory Concept for Player Experience Research and Game Design", 'games', 'Tue', '11:00', '12:30', 'P1 · Room 114', 'Designing Player Experience', 'Jaakko Väkevä, Jan Vornhagen, Heidi Rautalahti et al.', A + '3790834', ''],
      ["\"Social Media Killed Our Generation\": Teenagers' Felt Experiences of Harm on Social Media", 'soc', 'Wed', '11:00', '12:30', 'P1 · Room 121', 'Teenagers & Technology', 'Ritika Gairola, Colin Gray, Jingxin Dong et al.', A + '3791519', "Teenagers describe, in their own words, how social media harms them."],
      ["“Families are messy”: From Parent-Child Tensions to Family-Centered Design of Smart Home Technologies", 'home', 'Fri', '13:15', '14:45', 'P1 · Room 121', 'Families, Informal Learning & Home Contexts', 'Kaiwen Sun, Jade Li, Irene Chung et al.', A + '3790865', ''],
      ["“I Don’t Think RAI Applies to My Model” – Engaging Non-champions with Sticky Stories for Responsible AI Work", 'ai', 'Thu', '13:15', '14:45', 'P1 · Room 120', 'Social Impact and Responsible Tech', 'Nadia Nahar, Chenyang Yang, Yanxin Chen et al.', A + '3791285', '']
     ];
  var DAYS = [['Mon', 'Mon, May 10', '2027-05-10'], ['Tue', 'Tue, May 11', '2027-05-11'], ['Wed', 'Wed, May 12', '2027-05-12'], ['Thu', 'Thu, May 13', '2027-05-13'], ['Fri', 'Fri, May 14', '2027-05-14'], ['TBA', 'Not scheduled', '']];
  var TOPICS = [['all', 'All topics'], ['acc', 'Accessibility'], ['ai', 'AI & agents'], ['health', 'Health & wellbeing'], ['xr', 'Haptics & XR'], ['soc', 'Society & justice'], ['home', 'Home & everyday life'], ['learn', 'Learning'], ['games', 'Games & play'], ['data', 'Data & visualization'], ['sys', 'Systems & fabrication']];
  function venueRoom(label) {
    if (label === 'Auditorium') return 'Auditorium';
    var m = label.match(/^(P\d|M\d) · Room (.+)$/);
    if (m) return m[1] + ' - Room ' + m[2];
    m = label.match(/^Area 1\+2\+3 · (\w+)$/);
    if (m) return 'Area 1 + 2 + 3: ' + m[1].toLowerCase();
    return null;
  }
  var dayInfo = {};
  DAYS.forEach(function (d) { dayInfo[d[0]] = d; });
  window.CHI_AWARDS = {
    days: DAYS,
    topics: TOPICS,
    papers: P.map(function (r) {
      return {
        id: r[8], title: r[0], topic: r[1], day: r[2], dayLabel: dayInfo[r[2]][1], date: dayInfo[r[2]][2],
        start: r[3], end: r[4], roomLabel: r[5], room: venueRoom(r[5]), session: r[6], authors: r[7],
        doi: 'https://doi.org/10.1145/' + r[8], summary: r[9]
      };
    })
  };
})();
