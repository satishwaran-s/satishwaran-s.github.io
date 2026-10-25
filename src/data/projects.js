export const projects = [
  {
    slug: "automated-spray-painting-robot",
    title: "Automated Spray Painting Robot",
    module: "Capstone Project",
    period: "Solo capstone project",
    tags: [
      "ROS2",
      "SLAM",
      "Navigation2",
      "Computer Vision",
      "Teleoperation",
      "Odometry",
      "Arduino",
      "Project Management",
    ],
    cover: "/images/capstone/img-00.png",
    summary:
      "A solo capstone project developing an airfield runway marking robot from scratch with both autonomous and teleoperated operating modes. Designed to reduce a 7-worker, 4-hour overnight repainting operation to a single operator, the system integrates ROS2, SLAM, PID-controlled odometry, LiDAR and computer vision into a low-cost, plug-and-play platform compatible with existing paint systems.",
    overview: {
      paragraphs: [
        "**The problem** Runway markings are essential for safe navigation and must be regularly repainted to maintain visibility and accuracy. The airport handles roughly 1,000 takeoffs and landings every day. Each runway is closed for repainting three times a week and the work has to happen inside a tight 4-hour overnight window to avoid disrupting operations. The task is labour-intensive and time-sensitive.",
        "**The limitation of the status quo** The current manual method needs 7 workers to finish within that 4-hour window. This heavy reliance on manual labour drains human resources that could be directed to other critical tasks and it makes consistently meeting the strict time constraints difficult. Meanwhile, the robotic-arm spray-painting solutions already on the market are extremely expensive to deploy and maintain, making them impractical for cost-effective, large-scale adoption.",
        "**The proposed solution** An automated spray painter designed specifically for airfield runway marking. Unlike the costly robotic-arm products, the system is designed as a plug-and-play addition to existing paint systems, cutting both deployment and maintenance costs. The objective was tackled in three stages:",
      ],
      bullets: [
        "A semi-autonomous mobile platform with teleoperation and motion-safety modules.",
        "Improved line pre-marking efficiency.",
        "A path toward fully autonomous operation using computer vision.",
      ],
      paragraphsAfter: [
        "**Why build from scratch** Instead of mounting the painting rig on an off-the-shelf platform (e.g. a TurtleBot3 or an AgileX LIMO), I chose to design and build the entire robot from standard, readily available parts. While significantly more demanding, this approach provided a deeper understanding of the complete robotic system, pulling together mechanical design, embedded control, ROS2 software, perception and project management into one integrated system. It forced me to understand every layer rather than just integrate a vendor platform.",
      ],
    },
    sections: [
      {
        heading: "Project Management",
        paragraphs: [
          "A hybrid Waterfall + Agile approach drove the project.",
        ],
        bullets: [
          "Waterfall was applied to the upfront plan: requirements gathering, analysis, system design and hardware build. Hardware changes late in development are costly, so a structured, phased sequence suited the mechanical and integration work.",
          "Agile was applied to the iterative software development process, covering motor control, navigation, perception and testing. This enabled incremental development, quick adaptation and continuous refinement.",
          "The mix balanced thorough upfront planning with the flexibility to respond to feedback as the system evolved.",
        ],
        paragraphsAfter: [
          "A full project-management package was produced alongside the build, reflecting a systems-engineering mindset: project charter, schedule, risk, resource and procurement management plans, meeting minutes, a risk register and a Verification & Validation matrix. The whole robot was built within a constrained budget (~$600) by favouring standard, locally available components.",
        ],
        images: [],
        video: null,
      },
      {
        heading: "Prior Art & Literature Review",
        paragraphs: [
          "Before designing anything, I reviewed existing patents and products (USPTO, Google Patents, Lens.org) to understand the landscape and find gaps.",
        ],
        bullets: [
          "Most patents describe a robotic arm with a spray nozzle at the end effector. Refining the search terms, such as using \"line marking robots,\" helped surface more relevant prior work.",
          "The review exposed the key market gap: capable line-marking robots exist but are dominated by costly robotic-arm designs, leaving room for a simpler, affordable, plug-and-play alternative.",
        ],
        paragraphsAfter: [
          "A supporting literature review covered the technologies that would shape the design:",
          "Sensors & perception: wheel encoders for odometry and motion feedback.",
          "Mechanical design & kinematics: modular mechanical design and wheeled-robot locomotion.",
          "Hardware/software integration: Raspberry Pi + Arduino integration, motor control and PID tuning.",
          "Software: ROS2 for robot control, with Gmapping, Hector SLAM and Cartographer evaluated to inform the mapping approach.",
          "This research gave a clear baseline for the system's essential requirements before any CAD or code.",
        ],
        images: [],
        video: null,
      },
      {
        heading: "System Design & Idea Generation",
        paragraphs: [
          "The design was grounded in an explicit requirement set. The robot had to:",
        ],
        bullets: [
          "Be feasible: built with existing technology and resources.",
          "Meet stakeholder needs: the crew that actually does the repainting.",
          "Use readily available resources: no fragile, long-lead procurement.",
          "Have automation potential: a clear path toward full autonomy.",
          "Prioritise safety: safety features and compliance with industry expectations.",
          "Be scalable: easy to scale up without major rework.",
          "Be modular: accommodate new sensors and components over time.",
        ],
        paragraphsAfter: [
          "Hand sketches explored spray paint mounting methods and nozzle types. A deliberate design decision was made to avoid using a robotic arm for the spraying task and instead achieve similar functionality through a simpler mechanism. Simplicity and maintainability were prioritised, with clean and accessible construction treated as core design goals to minimise wiring complexity and simplify future maintenance.",
          "This evolved into a CAD model used to lay out the system, check tolerances and simulate movement. The design kept things simple and standard (same-screw-head fasteners, readily available makerspace and hardware-shop parts), with the robot's top intentionally left open for future upgrades. High-level components included a Raspberry Pi 4, Arduino Mega 2560, YD-LiDAR X4, Raspberry Pi camera, peristaltic pump, wheel encoders and a spray nozzle.",
        ],
        images: [
          {
            src: "/images/capstone/img-01.png",
            caption: "Idea generation through hand sketches of spray paint mounting methods and nozzle types.",
          },
          {
            src: "/images/capstone/img-02.png",
            caption: "CAD model used to lay out the system, check tolerances and simulate movement.",
          },
        ],
        video: null,
      },
      {
        heading: "Implementation & Integration",
        paragraphs: [
          "**Hardware** The chassis was built from aluminium profiles and laser cut acrylic panels, providing a lightweight, cost effective structure that was easy to modify and maintain. The layout was designed with function, accessibility and maintainability in mind:",
        ],
        bullets: [
          "Spray-painting components at the rear.",
          "LiDAR, Arduino and motor driver in the lower compartment.",
          "Raspberry Pi, camera and touchscreen on top.",
          "Laser-cut acrylic panels securely mount the sensors; most wiring is routed at the back for cleanliness; components and chassis can be removed with standard screwdrivers for easy servicing.",
        ],
        paragraphsAfter: [
          "**Power & circuits** Initially the system used a Matek Mini PDB (5V + 12V rails) to power the 5V Arduino and the 12V motors and pump. When a soldering fault damaged the PDB mid project, I improvised with a breadboard for power distribution while waiting for a replacement, allowing development to continue without interruption. The circuit diagram is shown below.",
          "**Architecture** The system splits cleanly between high-level and low-level control. The Raspberry Pi 4 (the \"brain\") runs Ubuntu 22.04 with ROS2 Humble and handles navigation, mapping and perception, communicating with the Arduino over USB. The Arduino Mega 2560 (the low-level controller) handles the wheel motors, the peristaltic pump and the non-contact liquid sensor.",
          "**Software (ROS2)** A custom odometry node (motor_control_ros2.py) reads serial data from the Arduino over /dev/ttyUSB1 at 115200 baud and turns it into usable odometry. Parameters are configurable rather than hard-coded: serial_port, odom_frame, base_frame, wheel_base, linear_scale, angular_scale and drift_threshold. The node publishes /odom (nav_msgs/Odometry) and broadcasts the odom to base_link transform via TF2 on a 0.05 s timer, with QoS tuned to BEST_EFFORT reliability and KEEP_LAST depth 10 for the /cmd_vel subscription. It subscribes to /cmd_vel and maps linear and angular velocity into discrete commands through a dead-zone threshold (0.05 m/s), with an angular split at 0.5 for turning, emitting Forward / Backward / Left / Right / Stop to the Arduino. It implements a drift-correction heuristic that scales back position error once accumulated drift exceeds a threshold, keeping the map consistent and provides an odometry reset used before setting 2D nav goals and poses in RViz.",
          "**Low-level Arduino control** The firmware drives two DC motors through an L298N dual H-bridge and reads quadrature encoders via CHANGE-triggered hardware interrupts on four pins to count wheel ticks and direction. PID control over motor speed keeps wheels tracking commanded movement and the robot's trajectory straight. A scale factor aligns encoder counts with the physically measured distance, while values are streamed to the Pi in a REGEX format, D: <distance> A: <angle>. Only the linear and angular values required for /odom are extracted, while the timestamp field is intentionally ignored for greater reliability.",
          "**Perception & safety** The YD-LiDAR X4 provides real-time ranging and feature detection for mapping and collision avoidance; URDF/Xacro models describe the robot for visualisation in RViz. A custom OpenCV node subscribes to the camera feed (/image_raw), converts via cv_bridge to BGR and then HSV for thresholded segmentation of brown objects (H 10–30). Contours are extracted with cv2.findContours and boundingRect and distance is estimated from object width using the triangle relationship D = (KNOWN_WIDTH × FOCAL_LENGTH) / w, where KNOWN_WIDTH is the object's physical width, FOCAL_LENGTH a calibration constant and w the object width in pixels. A moving-average filter over the last 5 readings (a fixed-size deque) smooths noisy measurements; a 20-pixel noise floor discards false positives such as dust or image noise and a proximity stop triggers when a detected object comes within 30 cm. Off-the-shelf options like TensorFlow Lite were evaluated but their model footprint was too heavy for the Pi's memory and space constraints, so a lightweight custom implementation was the right call.",
          "**Spray painting** Spraying is controlled from the operator's side: the robot is navigated with WASD + Space and the pump is toggled with P / O. The peristaltic pump provides precise paint flow control through PWM duty cycle (0–255), while the non-contact liquid sensor prevents the pump from running dry. If no liquid is detected, the pump automatically switches off and movement commands are halted.",
        ],
        images: [
          {
            src: "/images/capstone/img-03.png",
            caption: "The physical robot, built with an aluminium profile and laser cut acrylic chassis.",
          },
          {
            src: "/images/capstone/img-04.png",
            caption: "Circuit diagram of the power and control architecture.",
          },
          {
            src: "/images/capstone/img-10.png",
            caption: "Object detection output, showing the bounding box and estimated distance on the camera feed.",
          },
          {
            src: "/images/capstone/img-11.png",
            caption: "Spray painting in action.",
          },
        ],
        video: null,
      },
      {
        heading: "Verification & Validation",
        paragraphs: [
          "A structured V&V process, documented in a matrix, was used to test each functional requirement, covering motor control, distance and rotation accuracy, odometry, mapping, perception and spraying. Each requirement was evaluated against defined acceptance criteria and recorded as pass or fail.",
          "**Distance test** The robot was driven 1.2 m forward, with slight left and right adjustments fed into the PID controller to maintain a straight trajectory. It recorded a final distance of 1.1920 m with stable readings and no fluctuation, demonstrating accurate distance tracking.",
          "**Rotation test** From the 1.1920 m mark, the robot was rotated 90° left and right. The recorded value was −1.7420 rad. Accounting for the initial −0.1508 rad offset, the net rotation was approximately −1.5912 rad, or −91°, which was within the ±5° acceptance tolerance.",
          "**Odometry validation** Published odometry values were checked against ros2 topic echo /odom. The X position of 1.19 m matched the expected value, while Y at 0.01 m matched the rounded measured value of 0.005 m. The Z orientation remained at 0, confirming that odometry was correctly processed and transmitted without rotational drift.",
          "**Mapping** Mapping was the most challenging part of the validation process. slam_toolbox produced three recurring failure modes:",
        ],
        bullets: [
          "**Fluctuating odometry:** The map shifted as the robot moved. This was addressed by refining the publish frequency and REGEX parsing of /odom.",
          "**False rotation:** The system detected rotation while the robot was physically stationary. This was fixed by synchronising the published odometry with the actual measured values.",
          "**Map duplication:** Multiple scan layers appeared when the robot moved forward. This was reduced by lowering odometry and scan delays, with further improvement achieved at slower speeds.",
        ],
        paragraphsAfter: [
          "As slam_toolbox continued to produce inconsistent results, I switched to slam_gmapping for LiDAR based mapping and successfully generated a usable map, which was then refined in GIMP. Key practices adopted included loop closing, maintaining a low and constant motor speed, avoiding reverse motion and sharp turns and tuning parameters to suit the environment.",
          "**Object detection accuracy** A brown object with an actual distance of 58 cm was detected at 58.14 cm, confirming the accuracy of the ranging pipeline.",
        ],
        images: [
          {
            src: "/images/capstone/img-05.png",
            caption: "Distance test: 1.2 m commanded, 1.1920 m recorded.",
          },
          {
            src: "/images/capstone/img-06.png",
            caption: "Rotation test: 90° rotation within ±5° tolerance.",
          },
          {
            src: "/images/capstone/img-07.png",
            caption: "Odometry reading: published /odom values matching the console.",
          },
          {
            src: "/images/capstone/img-08.png",
            caption: "slam_toolbox issues: the recurring failure modes identified during mapping.",
          },
          {
            src: "/images/capstone/img-09.png",
            caption: "Final map produced with slam_gmapping and refined.",
          },
          {
            src: "/images/capstone/img-10.png",
            caption: "Object detection at 58 cm: bounding box and distance estimate.",
          },
        ],
        video: null,
      },
      {
        heading: "Autonomous Navigation & Future Work",
        paragraphs: [
          "Using the cleaned map with Nav2, the robot localised well via 2D Pose Estimate as LiDAR features matched the map. However, publishing a Nav2 Goal caused the robot to circle and lose localisation as the scan stopped matching features. Tuning tolerances, radius and obstacle-layer persistence helped but did not fully fix smooth movement. Identified candidates for future work: repositioning the LiDAR (below the chassis or above at camera height) and swapping the local planner from DWB to TEB.",
          "A broader set of recommendations rounds out the roadmap:",
        ],
        bullets: [
          "IMU integration for more robust odometry, especially on uneven terrain where wheel encoders drift.",
          "Air compressor for consistent paint flow and pressure control.",
          "Docking station for automated charging and paint refill.",
          "Remote monitoring and control via a mobile app.",
          "Finer spray-nozzle control for better coverage and finish.",
          "Protective casing for dust, rain and physical damage.",
          "More real-world edge-case testing across terrain, weather and paint-application accuracy.",
        ],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/capstone/img-12.png",
            caption: "RViz output during navigation with Nav2.",
          },
        ],
        video: null,
      },
    ],
  },

  {
    slug: "rapidblitz",
    title: "RapidBlitz",
    module: "James Dyson Award 2023",
    period: "14-week systems engineering project",
    tags: [
      "Systems Engineering",
      "SOLIDWORKS",
      "Prototyping",
      "Sustainability",
      "Risk Management",
    ],
    cover: "/images/rapidblitz/img-00.png",
    summary:
      "A James Dyson Award 2023 entry applying Systems Engineering to cut water waste from blender jug rinsing in Singapore bubble tea shops, roughly 6,148 m³ of water every month, equivalent to 2.5 Olympic-sized swimming pools.",
    overview: {
      paragraphs: [
        "This project was an entry for the James Dyson Awards 2023, where the goal was to design and develop a prototype focused on addressing a specific problem with sustainability as a central theme. The project applied Systems Engineering (SE) processes and methodologies to facilitate learning through hands-on application. By following the competition’s requirements, the primary objective was for the team to apply SE knowledge in creating an innovative, sustainable and complex system through iterative development, ultimately aiming for successful entry into the competition.",
        "In this project, my team and I focused on the issue of excessive water consumption in the rapidly growing beverage industry, particularly in establishments such as bubble tea shops. These businesses collectively contribute to significant water usage, with a specific concern regarding blender jug rinsing.",
        "Through extensive research and interviews, we discovered that in 2022, approximately 6,148 cubic metres of water were used each month across bubble tea shops in Singapore for rinsing blender jugs. This volume is roughly equivalent to 2.5 Olympic-sized swimming pools, underscoring the significant water consumption in the industry amid Singapore’s ongoing water scarcity challenges.",
        "To tackle this problem, we developed an innovative solution to significantly reduce water usage while preparing beverages efficiently.",
      ],
      bullets: [],
    },
    sections: [
      {
        heading: "Project Management",
        paragraphs: [
          "Effective project management is key to delivering successful outcomes in robotics. Throughout the project, the focus was on balancing technical challenges with time, resources and team collaboration. This has allowed the team to not only achieve project goals but also learn valuable lessons about managing complexity and maintaining efficiency.",
        ],
        bullets: [
          "To guide the project’s progress, several key project management frameworks and processes were employed, including:",
          "Business/Mission Analysis Process",
          "Stakeholder Needs and Requirements Definition Process",
          "System Requirement Definition Process",
          "Design Definition Process",
          "Architecture Definition Process",
          "System Analysis Process",
          "Implementation Process",
          "Integration Process",
          "Verification and Validation Process",
          "Risk Management (including the use of a Risk Register) and other relevant documentation",
        ],
        paragraphsAfter: [
          "By integrating these processes, the project was structured to ensure a systematic, organized approach from inception to completion.",
        ],
        images: [],
        video: null,
      },
      {
        heading: "Project Planning and Analysis",
        paragraphs: [
          "This section focuses on the Business/Mission Analysis and Stakeholder Needs and Requirements Definition Process.",
          "In this project, we aligned our goals with key stakeholders, including SIT faculty staff and the James Dyson Award judges. After identifying a broad problem space related to sustainability, the team focused on reducing water consumption in bubble tea shops. Through iterative brainstorming and research, we refined the problem to the excessive water used in blender rinsing, leading to a solution aimed at improving water efficiency in the non-domestic sector, particularly addressing the needs of bubble tea shops in Singapore.",
          "Our solution was to develop a modular adaptor compatible with existing blender systems, enabling the use of plastic cups for blending. This allows bubble tea shop employees to blend ingredients directly in the plastic cups, eliminating the need for a blender jug and significantly reducing water usage during rinsing.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
      {
        heading: "System and Design Definition",
        paragraphs: [
          "This project involved translating stakeholder needs into measurable system requirements, ensuring alignment with project goals. System requirements, such as reducing water usage during rinsing and ensuring component compatibility, were defined to address the problem effectively.",
          "The architecture was structured into internal and external views, detailing components, interactions and operational workflows to ensure scalability and robustness.",
          "The design process involved iterative CAD modeling, prototyping and testing to balance functionality and user experience. Feasibility and performance were evaluated through iterative system analysis, refining prototypes and materials, to meet sustainability and operational efficiency requirements.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/rapidblitz/img-01.jpg",
            caption:
              "Operational architecture of current practices and activities: yellow boxes represent operational activities based on the two users: Customer and Employees.",
          },
          {
            src: "/images/rapidblitz/img-02.jpg",
            caption:
              "System architecture of the proposed solution: how the system (proposed solution) will interact with the environment.",
          },
          {
            src: "/images/rapidblitz/img-03.jpg",
            caption:
              "Logical architecture of the proposed solution: how the system (proposed solution) will work to fulfill the expectations of the stakeholders.",
          },
          {
            src: "/images/rapidblitz/img-04.jpg",
            caption:
              "Physical architecture of the proposed solution: how the system (proposed solution) will be constructed along with its hardware allocation.",
          },
          {
            src: "/images/rapidblitz/img-05.jpg",
            caption:
              "System elements of the proposed solution. The blender base and blade are original; the jug cut-out enables a custom adaptor; the blade-to-cup adaptor (final design) integrates the connector with the jug cut-out.",
          },
          { src: "/images/rapidblitz/img-06.jpg", caption: "Design sketches." },
          {
            src: "/images/rapidblitz/img-07.jpg",
            caption:
              "Solidworks rendering of the clip mechanism connector. When it failed to meet expectations, we redesigned the adaptor through precise measurements and custom threading, leading to the push-pull adaptor.",
          },
          { src: "/images/rapidblitz/img-08.jpg", caption: "Design sketches." },
          {
            src: "/images/rapidblitz/img-09.png",
            caption: "Solidworks rendering of the push-pull adaptor.",
          },
          {
            src: "/images/rapidblitz/img-10.jpg",
            caption: "Prototype iterations.",
          },
        ],
        video: null,
      },
      {
        heading: "Implementation and Integration",
        paragraphs: [
          "The integration process ensured seamless assembly and functionality of the system through three key steps, validating each interface against system requirements.",
        ],
        bullets: [
          "Step 1: Integrated the push-pull adaptor with the blade component by screwing them together, verifying the fit, structural integrity and leak prevention.",
          "Step 2: Combined the cup with the push-pull adaptor and blade component by pushing the cup into the adaptor, ensuring it remains securely attached.",
          "Step 3: Assembled the cup, adaptor, blade component and blender base by slotting and twisting the aggregate into the blender base, ensuring stability during tightening and loosening.",
        ],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/rapidblitz/img-11.jpg",
            caption:
              "The final configuration of RapidBlitz incorporates the refined push-pull adaptor, now renamed the blade-to-cup adaptor, ensuring seamless integration and enhanced functionality.",
          },
        ],
        video: null,
      },
      {
        heading: "Verification, Validation and Risk Management",
        paragraphs: [
          "Two prototype designs were tested against criteria: the clip mechanism adaptor failed verification, while the push-pull adaptor met requirements and was further refined with threaded integration.",
          "To mitigate risks during system testing, a protective test rig was designed and fabricated to ensure safety, adhering to Singapore’s Ministry of Manpower standards. A risk register was created to outline the likelihood and severity levels, while a traceability matrix details tests and criteria for system compliance. All blending tests were conducted using the safety rig, ensuring validation aligned with stakeholder and system requirements.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/rapidblitz/img-12.png",
            caption: "Protective test rig which was designed and fabricated.",
          },
        ],
        video: null,
      },
      {
        heading: "Introducing RapidBlitz",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          { src: "/images/rapidblitz/img-13.jpg", caption: "RapidBlitz." },
        ],
        video: {
          title: "RapidBlitz redefining drink preparation in bubble tea shops",
          file: "/videos/rapidblitz-demo.mp4",
          drive:
            "https://drive.google.com/file/d/19cq06-GLMSA0mJW-9HAiRbBzxNUGtaXx/preview",
        },
      },
    ],
  },

  {
    slug: "mobile-bookdrop-part-1",
    title: "Mobile Bookdrop Part 1",
    module: "Year 2 · Trimester 1",
    period: "14-week project",
    tags: [
      "ROS2",
      "Gazebo",
      "SLAM",
      "Navigation2",
      "Agile",
      "Stakeholder Engagement",
    ],
    cover: "/images/bookdrop-p1/img-00.jpg",
    summary:
      "Requirements discovery, simulation and concept design for an autonomous Mobile Bookdrop for the Ngee Ann Kongsi Library as it transitions to SIT Punggol.",
    overview: {
      paragraphs: [
        "During the first trimester of Year 2, I worked on a 14-week project aimed at addressing the needs of stakeholders from the Ngee Ann Kongsi Library. The objective was to engage with these stakeholders, understand their requirements and develop innovative ideas to assist librarians as the library transitions to SIT Punggol.",
        "Through extensive stakeholder engagement, we identified key requirements for a solution that would:",
      ],
      bullets: [
        "Assist them in doing mundane tasks like collecting books so that the librarians can perform more value-added tasks",
        "Increase the collection rate of the returned books",
        "Provide a convenient book drop access for students",
        "Ensuring safety of users of the service",
      ],
      paragraphsAfter: [
        "After consolidating these requirements, we proposed creating a Minimum Viable Product (MVP) called the Mobile Bookdrop. This autonomous solution would move between designated points to collect returned books, addressing the stakeholders’ needs efficiently. We developed initial design sketches for the MVP, ensuring they aligned with the library’s objectives. The Mobile Bookdrop aimed to alleviate the labor-intensive, repetitive tasks currently performed by librarians, improve manpower efficiency and streamline the book collection process for students.",
        "The project was divided into phases, with Part 1 focusing on simulation, design, planning and concept development strategies to meet stakeholder requirements. We adopted an Agile approach to manage this phase effectively, combining flexibility with structured planning.",
        "This phase heavily emphasised project management, where we delved into the processes and management plans aligned with the project’s life cycle stages. This involved defining objectives, aligning tasks with deliverables and applying project management principles to ensure the stakeholders’ needs were met efficiently.",
      ],
    },
    sections: [
      {
        heading: "Design idea",
        paragraphs: [
          "After extensive brainstorming and considering various options, this was one of the many ideas that addressed all the stakeholders’ needs.",
          "In this design, there are 2 main components:",
        ],
        bullets: [
          "book drop: a stationary unit positioned at multiple locations within the library",
          "container attached to the robotic platform with wheels on the corners",
        ],
        paragraphsAfter: [
          "The purpose of this design is to have multiple book drops around the library with only one robotic platform needed to collect the returned books from each book drop.",
          "The book drop features a 'slide' system which will safely slide the books down to hold them in. There will also be a stopper at the bottom which will prevent the books from slipping out.",
          "When the robotic platform approaches the book drop and triggers a button, the returned books will drop into the container. The robotic platform will then navigate itself back to the librarians so that they can process the books to be marked as returned.",
        ],
        images: [
          {
            src: "/images/bookdrop-p1/img-00_original.jpg",
            caption: "Design idea.",
          },
        ],
        video: null,
      },
      {
        heading: "Simulation",
        paragraphs: [
          "We used the ROS2 framework for this trimester.",
          "The first step was to get the map layout of the level 5 of the Ngee Ann Kongsi Library and add in the walls using the Gazebo Building Editor. Following that we performed SLAM to map out the environment and edited the map.",
          "We tested the level 5 layout in Gazebo to ensure the robotic platform was able to navigate well. We fine-tuned some of the Navigation2 parameters to better suit the needs of the stakeholders. Although this was a simulation, it provided us with valuable insights on how the robotic platform will perform in a real life scenario.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: {
          title: "Simulation walkthrough (ROS2 / Gazebo)",
          file: "/videos/bookdrop-p1-simulation.mp4",
          drive:
            "https://drive.google.com/file/d/1uopjmOLzOOym7cATw2xd6oPJ3uzbRMN2/preview",
        },
      },
    ],
  },

  {
    slug: "mobile-bookdrop-part-2",
    title: "Mobile Bookdrop Part 2",
    module: "Year 2 · Trimester 2",
    period: "13-week project · 2 sprints",
    tags: [
      "ROS2",
      "LIMO",
      "Agile / Scrum",
      "Load Cell",
      "Ultrasonic Sensors",
      "LiDAR",
      "Project Management",
    ],
    cover: "/images/bookdrop-p2/img-00.jpg",
    summary:
      "Two-sprint build of the Mobile Bookdrop MVP — Project Management Plans, mapping and navigation and full software, mechanical and electrical integration of a safe, functional book-collection robot.",
    overview: {
      paragraphs: [
        "For this project, I worked on it in my second trimester of Year 2 for a total of 13 weeks.",
        "The purpose of this project was to:",
      ],
      bullets: [
        "Develop the Project Charter and Project Management Plans",
        "Produce a suitable Minimum Viable Product (MVP) based on our analysis of stakeholder needs gathered during Project 3 in Year 2, Trimester 1",
      ],
      paragraphsAfter: [
        "This phase continued the work from the previous project phases, including selecting the optimal system, iterating through multiple design options, realising the chosen design, integrating all components and thoroughly verifying and validating the entire system.",
        "To achieve our objective, we adopted the Agile methodology, which allowed for constant feedback and gave the team the flexibility to adapt to changes as they arose, providing better control over the project.",
        "We divided the trimester into 2 sprints. The first sprint was from 4th January 2023 to 6th February 2023 and the second sprint was from 13th February 2023 to 20th March 2023.",
      ],
    },
    sections: [
      {
        heading: "Sprint 1",
        paragraphs: [
          "In the first sprint, the team focused on developing the MVP by prioritising the software and mechanical aspects while creating the Project Management Plans.",
          "Our efforts resulted in the following accomplishments:",
        ],
        bullets: [
          "Technical designs: update from Project 3",
          "Project Management Plans: documents which include Project Charter, BOM List and the relevant Project Management Plans like Procurement, Scope, Schedule, Risk, Resource, Requirement, Change and Configuration Management Plans as well as risk register, traceability matrix and BOM List",
          "Software development: which includes the mapping and navigation of the LIMO along with the testing",
          "Mechanical development: which includes the measurements, CAD and building up the MVP",
          "Integration: Ensuring the successful integration of software and mechanical components for a functional MVP",
        ],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
      {
        heading: "Sprint 2",
        paragraphs: [
          "In the second sprint, the team continued to refine the Project Management plans and further developed the software and mechanical aspects. We also added the electrical and safety features to the MVP.",
          "The following accomplishments were made:",
        ],
        bullets: [
          "Iterated Project Management Documents: Further refinement of the plans",
          "Sensor Testing: Assembled and tested the load cell sensor and emergency stop button, as well as four ultrasonic sensors",
          "Electrical Integration: Successfully integrated the electrical components with the MVP developed during Sprint 1.",
        ],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
      {
        heading: "System Overview",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/bookdrop-p2/img-00_original.jpg",
            caption:
              "Mobile Bookdrop overview: the system consists of 6 subsystems (white ovals inside the orange circle). Blue ovals represent the users and the arrows show the interactions.",
          },
        ],
        video: null,
      },
      {
        heading: "System and Design Definition",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/bookdrop-p2/img-01.jpg",
            caption:
              "Operational Analysis: this diagram shows the current operations in the library.",
          },
          {
            src: "/images/bookdrop-p2/img-02.jpg",
            caption:
              "System Analysis: this diagram shows how the Mobile Bookdrop will help to fulfill the needs of the stakeholders.",
          },
          {
            src: "/images/bookdrop-p2/img-03.jpg",
            caption:
              "Logical Architecture: this diagram shows how the Mobile Bookdrop will work and the function of each of the subsystems.",
          },
          {
            src: "/images/bookdrop-p2/img-04.jpg",
            caption:
              "Physical Architecture: this diagram shows how the Mobile Bookdrop will be developed and built along with the interactions and interfaces.",
          },
        ],
        video: null,
      },
      {
        heading: "Key feature of the Mobile Bookdrop: Loadcell",
        paragraphs: [
          "The foam is a high density sponge to cushion the impact when books are dropped into the Mobile Bookdrop. The load cell can hold up to 10kg weight. The baseplate and spacer are wood pieces and the mounting plate is an aluminium sheet.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/bookdrop-p2/img-05.jpg",
            caption: "Cross-sectional view of load cell sensor.",
          },
        ],
        video: null,
      },
      {
        heading: "CAD of the Mobile Bookdrop",
        paragraphs: [
          "Significant advancements were made to the design of the MVP. After a thorough evaluation, we decided to move away from our original design which involved a container mounted onto a robotic platform and a book drop. Instead, we developed a more refined and feasible single-unit design which is the Mobile Bookdrop.",
          "The improved design offers a lot of advantages such as:",
        ],
        bullets: [
          "Requiring lesser components",
          "increased efficiency",
          "Streamlined functionality without losing any of its originally intended functions",
        ],
        paragraphsAfter: [
          "However, there was still a drawback to this design where the Mobile Bookdrop may be momentarily unavailable when it is transporting the books.",
        ],
        images: [
          { src: "/images/bookdrop-p2/img-06.jpg", caption: "Front view." },
          { src: "/images/bookdrop-p2/img-07.jpg", caption: "Side view." },
          { src: "/images/bookdrop-p2/img-08.jpg", caption: "Isometric view." },
          {
            src: "/images/bookdrop-p2/img-09.jpg",
            caption:
              "Cross-sectional side view with load cell sensor in place.",
          },
        ],
        video: null,
      },
      {
        heading: "Physical Mobile Bookdrop",
        paragraphs: [
          "The Mobile Bookdrop addresses the library's needs by providing a convenient, on-the-go bookdrop that can be easily accessed by users. Safety is a top priority for the library and the Mobile Bookdrop is equipped with ultrasonic sensors and a LiDAR, enabling it to avoid obstacles or stop movement within a 50cm radius. Additionally, an emergency stop button is included, which can be triggered by anyone in the event of an emergency. This technology ensures that the Mobile Bookdrop operates safely, minimising the risk of accidents or collisions.",
          "There are two possible scenarios for the Mobile Bookdrop, designed to meet the library's needs:",
        ],
        bullets: [
          "The Mobile Bookdrop moves autonomously from the librarian to the designated bookdrop. Once a certain weight of books is collected, it will travel back to the librarian.",
          "The Mobile Bookdrop moves autonomously from the librarian to the designated bookdrop and remains there for a predetermined amount of time, allowing users to drop off their books at their convenience. After the time limit is reached, it will autonomously return to the librarian, regardless of the number of books, as long as the load cell detects some weight. If the load cell does not register any weight, the Mobile Bookdrop will not return to the librarian.",
        ],
        paragraphsAfter: [
          "For both scenarios, the Mobile Bookdrop will detect and avoid obstacles in its path during navigation.",
        ],
        images: [
          {
            src: "/images/bookdrop-p2/img-10.png",
            caption: "Mobile Bookdrop.",
          },
        ],
        video: {
          title:
            "Mobile Bookdrop capacity triggered: full functionality after successful integration",
          file: "/videos/bookdrop-p2-demo.mp4",
          drive:
            "https://drive.google.com/file/d/1xSm3yMo1T5p87gKuCQjFpNfJrbZxHTjy/preview",
        },
      },
    ],
  },

  {
    slug: "ros1-agilex-limo-navigator",
    title: "ROS1 Agilex LIMO Navigator",
    module: "Year 1 · Trimester 3",
    period: "14-week project",
    tags: [
      "ROS1",
      "SLAM",
      "Navigation",
      "Fusion360",
      "3D Printing",
      "Line Following",
    ],
    cover: "/images/limo/img-00.jpg",
    summary:
      "Designed Terminal 2 of a Singapore Changi Airport arena and programmed an Agilex LIMO to navigate obstacles, run line-following courses and traverse other teams’ arenas — all within a $1,000 budget.",
    overview: {
      paragraphs: [
        "For this project, I worked on it for my last trimester of Year 1 for a total of 14 weeks.",
        "The purpose of this project was to develop capabilities in:",
      ],
      bullets: [
        "Mechanical Engineering (ME)",
        "Electrical, Electronic and Computing (EEC)",
        "Project Management (PM)",
        "Systems Engineering (SE)",
        "Robot Operating System (ROS1)",
      ],
      paragraphsAfter: [
        "We had to deliver an arena of Singapore Changi Airport and my team was tasked with designing Terminal 2.",
        "This project has 2 aspects:",
      ],
      bullets2: [
        "The LIMO has to navigate itself as quickly as possible while detecting and avoiding obstacles from the center of the Singapore Changi Airport arena and move through different arenas which have been designed by other teams and reach the endpoint.",
        "The LIMO must perform line following and tracking and complete the course in the shortest time possible.",
      ],
      paragraphsAfter2: [
        "With a budget of $1,000, we were allowed to purchase parts or outsource 3D printing services due to limited availability and time on school 3D printers.",
        "We began by designing our Terminal 2 setup from scratch using Fusion 360. Once the design was approved, we proceeded to 3D print key components, such as the ticketing machine, McDonald’s counter and McDonald’s circular table. To build the overall structure of Terminal 2, we used cardboard to elevate the platform, ensuring proper LiDAR detection, as the LiDAR was mounted at a height of approximately 12 cm on the LIMO robot.",
        "After completing the physical layout, we began mapping to ensure smooth navigation within our Terminal 2 arena. During mapping, challenges arose that required adjusting the depth camera angle and modifying the physical layout to optimise performance. Once successful navigation in Terminal 2 was achieved, we mapped the entire Singapore Changi Airport arena to test the LIMO’s ability to navigate across other teams’ arenas. Using the 2D Pose Estimate and 2D Nav Goal tools, we published points for the LIMO to move to. To address detection issues caused by low-lying areas outside the LiDAR’s range, we blocked those areas to prevent the LIMO from running onto them.",
        "Finally, we implemented line tracking and following. This phase went smoothly, requiring only minor trial-and-error adjustments to optimise the LIMO’s speed while ensuring it stayed on track.",
      ],
    },
    sections: [
      {
        heading: "CAD",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/limo/img-00_original.jpg",
            caption: "Fusion360 rendering of McDonald's.",
          },
          {
            src: "/images/limo/img-01.jpg",
            caption: "Final Fusion360 layout design of Terminal 2.",
          },
          { src: "/images/limo/img-02.jpg", caption: "3D printed parts." },
          {
            src: "/images/limo/img-03.jpg",
            caption: "Physical layout of the different view projections.",
          },
        ],
        video: null,
      },
      {
        heading: "Physical layout",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/limo/img-04.jpg",
            caption: "Final layout of Terminal 2 garden.",
          },
          {
            src: "/images/limo/img-05.jpg",
            caption: "Final layout of Terminal 2.",
          },
          {
            src: "/images/limo/img-06.jpg",
            caption: "Final layout of Terminal 2 McDonald's.",
          },
          {
            src: "/images/limo/img-07.jpg",
            caption:
              "Final layout of the Singapore Changi Airport arena, featuring various segments of Changi Airport collaboratively designed and built by different teams.",
          },
        ],
        video: null,
      },
      {
        heading: "ROS1",
        paragraphs: ["The tracks covered in ROS are:"],
        bullets: [
          "ROS",
          "Python Programming",
          "GIT and ROS service",
          "Gazebo",
          "Mapping",
          "Navigation",
          "Computer Vision with OpenCV",
          "Computer Vision with Machine Learning (ML)/Deep Learning (DL)",
          "RViz",
        ],
        paragraphsAfter: [],
        images: [
          { src: "/images/limo/img-08.jpg", caption: "Cleaned static map." },
          {
            src: "/images/limo/navigation.webp",
            caption:
              "LIMO navigating to different waypoints we set from the cleaned and edited map.",
          },
          {
            src: "/images/limo/img-10.jpg",
            caption: "Global costmap and Local costmap.",
          },
        ],
        video: null,
      },
      {
        heading: "Project Video",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: {
          title: "RSE2107A: final project video",
          file: "/videos/rse2107a.mp4",
        },
      },
      {
        heading: "Project Management",
        paragraphs: [
          "For this project, each team member assumed functional roles, contributing to different aspects of project execution. We developed a project charter that outlined the project’s purpose, objectives, scope, organisation and plan. To manage uncertainties, we created a risk register to monitor and control potential risks. Biweekly meetings were conducted to ensure the team remained aligned and on track to successfully complete the project. Additionally, we documented work performance data, capturing raw observations and measured metrics, such as time taken for various tasks, to assess progress and maintain accountability throughout the project.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
    ],
  },

  {
    slug: "follow-along-robot",
    title: "Follow Along Robot",
    module: "Year 1 · Trimester 2",
    period: "14-week project",
    tags: [
      "PixyCam2",
      "Ultrasonic Sensors",
      "ToF Sensors",
      "Mecanum Wheels",
      "ARM Cortex-M",
      "CAD",
    ],
    cover: "/images/follow-along/img-00.jpg",
    summary:
      "An autonomous robot that tracks a target with a PixyCam2, navigates omnidirectionally on mecanum wheels and detects obstacles from all four sides — built for a real-world security-robot use case.",
    overview: {
      paragraphs: [
        "The Follow Along Robot Prototype is a group project which I worked on for 1 trimester of about 14 weeks in my second trimester of Year 1.",
        "The aim of the Follow Along Robot Prototype project was to integrate mechanical design, sensor technology and programming to create an autonomous robot capable of following a target while being able to detect obstacles with real-world applications such as a security robot. The project focused on developing skills in system design, sensor integration (Ultrasonic and Time of Flight sensors) and programming for motion control and communication.",
        "We designed and fabricated several parts, including the torch holder mount, a switch presser to activate the torchlight and a mount for the emergency stop, as part of the Mechanical Engineering track for our litekit. In the Electrical Engineering track, we coded Spin files and programmed the ARM Cortex-M to handle movement control, communication and sensor detection.",
        "In this Project, we made use of the same type of sensors as we did for Project 1 which are the Ultrasonic sensors and Time of Flight (ToF) sensors. We increased the number of Ultrasonic sensors from 2 to 4 to allow for obstacle detection from all 4 sides as we used mecanum wheels for omnidirectional movement in this project. We also integrated a PixyCam2 to track the signature of a particular object, allowing the LiteKit to follow along.",
      ],
      bullets: [],
    },
    sections: [
      {
        heading: "User Acceptance Test (UAT)",
        paragraphs: [
          "In the final assessment for this project which is known as the User Acceptance Test (UAT), our task was to have 3 of the team's robots (2 fully functioning litekit (which are the team members' own individual robots) + 1 prototype kit (the team's shared robot) with net gun attachment) follow our instructor's robot which will guide all 3 robots. After our robots follow our instructor's robot through a certain path, the instructor will then move off his robot and allow the production kit to shoot the net gun.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: {
          title: "User Acceptance Test (UAT) video",
          file: "/videos/follow-along-uat.mp4",
          drive:
            "https://drive.google.com/file/d/1vcg1fXgjHLcYnj-cHJ0b5V2wD7c-8v89/preview",
        },
      },
      {
        heading: "Perception & Movement",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/follow-along/pixy-detection.webp",
            caption: "Movement classification from PixyCam2 object detection.",
          },
          {
            src: "/images/follow-along/mecanum-wheels.webp",
            caption: "Movements of mecanum wheels.",
          },
          {
            src: "/images/follow-along/object-detection.webp",
            caption: "Movement together with object detection.",
          },
        ],
        video: null,
      },
      {
        heading: "Torch Mount Design",
        paragraphs: [
          "The torch mount was designed to allow the torchlight to be tilted within a specific angle range and to be rotated independently. This functionality was achieved using two servo motors: one servo tilts the torch up and down, while the other operates a button presser that rotates the torch to turn it on and off. The mount was also designed specifically in a way to provide quick installation and removal of the torch.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/follow-along/cad-torch-mount-1.jpg",
            caption: "Prototype CAD design of the torch mount.",
          },
          { src: "/images/follow-along/cad-torch-mount-2.jpg", caption: "" },
          {
            src: "/images/follow-along/final-torch-mount-1.jpg",
            caption: "Physical final product of the torch mount.",
          },
          { src: "/images/follow-along/final-torch-mount-2.jpg", caption: "" },
          { src: "/images/follow-along/final-torch-mount-3.jpg", caption: "" },
          { src: "/images/follow-along/final-torch-mount-4.jpg", caption: "" },
        ],
        video: null,
      },
    ],
  },

  {
    slug: "teleoperated-land-based-locomotion-prototype",
    title: "Teleoperated Land-Based Locomotion Prototype",
    module: "RSE1101 · Project 1",
    period: "14-week project",
    tags: [
      "ARM Cortex-M",
      "Spin",
      "ToF Sensors",
      "Ultrasonic Sensors",
      "Mechanical Fabrication",
      "Xbee",
    ],
    cover: "/images/teleop/img-00.png",
    summary:
      "A group project integrating mechanical fabrication, sensor integration and motor control: the robot stops on ledges and obstacles using Time of Flight and ultrasonic sensors.",
    overview: {
      paragraphs: [
        "The Teleoperated Land-Based Locomotion Prototype was a group project completed over approximately 14 weeks during my first trimester in Year 1.",
        "The aim of this module was to build upon our mechanical and electrical knowledge while integrating these disciplines to design and develop a functional prototype. We focused on fabricating mechanical components, such as the bumper plate and bumper stud and implementing electrical systems, including sensor integration and communication protocols. The module also aimed to develop competency and practical application in project management, transferable skills and digital literacy through the use of industry-relevant tools and technologies.",
        "Through this project, we gained hands-on experience in coordinating mechanical design with sensor control and motor functionality, ensuring smooth interaction between hardware and software to achieve the desired locomotion capabilities.",
      ],
      bullets: [],
    },
    sections: [
      {
        heading: "The Prototype",
        paragraphs: [],
        bullets: [],
        paragraphsAfter: [],
        images: [
          {
            src: "/images/teleop/img-00_original.png",
            caption: "Final production kit of the prototype.",
          },
          {
            src: "/images/teleop/img-01.jpg",
            caption:
              "Poster for the robot with descriptions of our mission, what it does, some of our key learning points and the timeline of capability development.",
          },
        ],
        video: null,
      },
      {
        heading: "Sensor Control",
        paragraphs: [
          "The Litekit is equipped with both Time of Flight (TOF) and ultrasonic sensors located on the front and back to detect obstacles and ledges.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: {
          title:
            "Time of Flight (ToF) sensors: making sure the robot stops when it does not detect any surface both in front and back",
          file: "/videos/teleop-tof-demo.mp4",
          drive:
            "https://drive.google.com/file/d/14Ikhyt2CztLo_YSFYSwr1WludFnFJhD7/preview",
        },
        video2: {
          title:
            "Ultrasonic sensors: making sure the robot stops when it detects an obstacle both in front and back",
          file: "/videos/teleop-ultrasonic-demo.mp4",
          drive:
            "https://drive.google.com/file/d/1qmWfQTS5wFHt9UL9fFjFN6ZxZMrQXz55/preview",
        },
      },
      {
        heading: "MYLITEKIT: an integrated system",
        paragraphs: [
          "In the integrated system known as 'MYLITEKIT', Comms, sensor and motor control systems work in coordination. Data from the sensors and Xbee Receiver Unit is processed by the Parallax Propeller Project Board using Spin language, which then communicates with the RoboClaw 2x15A Motor Controller with decoders to control wheel movement.",
          "Before porting over the codes and sensors to the Production Kit, we each worked individually on the robot known as Lite Kit.",
          "The Lite Kit contains the same sensors and codes as the Production Kit, with slight adjustments made to account for the unique differences between individual robots, much like the differences between individual humans. These tweaks ensure optimal performance for each robot and help to maintain consistency and accuracy across all units.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [
          { src: "/images/teleop/img-02.png", caption: "" },
          { src: "/images/teleop/img-03.png", caption: "" },
          { src: "/images/teleop/img-04.png", caption: "" },
          { src: "/images/teleop/img-05.png", caption: "" },
        ],
        video: null,
      },
      {
        heading: "Project Management",
        paragraphs: [
          "For this project, each team member assumed distinct roles, such as project manager and functional manager. The project adhered to the five phases of project management, from initiation to closure. To ensure its success, we applied various project management concepts and principles, including conducting regular status meetings and maintaining a lessons-learned register to drive continuous improvement.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
      {
        heading: "Transferable Skills and Digital Literacy",
        paragraphs: [
          "Transferable skills such as Thinking Agility, People Agility, Digital Agility, Professional Agility and Change Agility were integral to this project. Regarding digital literacy, the eModules played a crucial role in developing digital competencies as well as skills and IT enrichment frameworks, fostering a digital mindset and enhancing research capabilities.",
        ],
        bullets: [],
        paragraphsAfter: [],
        images: [],
        video: null,
      },
    ],
  },
];

export const placeholderProjects = [
  {
    slug: "upcoming-robotics",
    title: "Robotics Project",
    tag: "Robotics",
    teaser:
      "An upcoming robotics project. Details will be documented here as the work progresses.",
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
