import { useState } from "react";
import { Shield, Github, Linkedin, Twitter, Mail, Award, Users, Code, Brain, Sparkles, Zap, Target } from "lucide-react";

const Team = () => {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Derrick Hanns",
      role: "CEO & Group Director",
      department: "Management",
      bio: "Founder of MailInsight, driving cybersecurity innovation and advanced email threat detection systems.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      skills: ["Leadership", "Strategy", "Vision"],
      achievements: "15+ Years in Cybersecurity",
      social: {
        linkedin: "https://linkedin.com",
        email: "chesire@mailinsight.com"
      }
    },
    {
      id: 2,
      name: "Iddy Chesire",
      role: "Senior Security Engineer",
      department: "Security",
      bio: "Expert in phishing detection, AI-powered scanning, and secure system architecture.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      skills: ["AI Security", "Threat Detection", "Architecture"],
      achievements: "Blocked 10M+ Threats",
      social: {
        github: "https://github.com/acunetix2",
        linkedin: "www.linkedin.com/in/iddy-chesire-55009b264",
        email: "iddychesire098@gmail.com"
      }
    },
    {
      id: 3,
      name: "Daniella Joy",
      role: "Head of UI/UX Design", 
      department: "Development",
      bio: "Designs modern, intuitive, and visually stunning user experiences for MailInsight products.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      skills: ["UI Design", "UX Research", "Prototyping"],
      achievements: "98% User Satisfaction",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "jane@mailinsight.com"
      }
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [hoveredMember, setHoveredMember] = useState(null);

  const departments = ["All", "Management", "Security", "Development"];

  const filteredMembers =
    selectedDepartment === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-24 overflow-hidden border-b border-gray-800">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-bounce">
              <div className="relative">
                <Users className="h-14 w-14 text-orange-500" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Meet the CyberKnights
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Elite cybersecurity experts building the future of AI-powered email security
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-400" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-400" />
                <span>Mission-Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 -mt-12 relative z-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, count: "3", label: "Expert Team Members", color: "orange", gradient: "from-orange-500 to-orange-600" },
              { icon: Code, count: "20+", label: "Years Combined Experience", color: "blue", gradient: "from-blue-500 to-blue-600" },
              { icon: Brain, count: "3", label: "Specialized Departments", color: "purple", gradient: "from-purple-500 to-purple-600" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-700 hover:border-orange-500">
                <div className={`h-16 w-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">{stat.count}</p>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedDepartment === dept
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/50"
                    : "bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredMembers.map((member, idx) => (
              <div
                key={member.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="animate-fadeIn"
              >
                <div
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 border-transparent hover:border-orange-300 transform hover:-translate-y-2"
                >
                  {/* Profile Image with Overlay */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        {member.achievements}
                      </div>
                    </div>

                    {/* Name overlay on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-orange-300 font-semibold">{member.role}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 text-xs font-bold rounded-full border border-orange-300">
                        {member.department}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 w-10 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="h-10 w-10 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-64 h-64 bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-6">
              <div className="h-16 w-16 bg-orange-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-orange-500/30">
                <Sparkles className="h-8 w-8 text-orange-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">Join the CyberKnights</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're building the future of email security. Join our mission to protect millions from cyber threats.
            </p>
            <a 
              href="mailto:chesire@mailinsight.com?subject=Career Opportunity Inquiry"
              className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 hover:-translate-y-1 duration-300 border-2 border-orange-400/30"
            >
              View Open Positions →
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Team;