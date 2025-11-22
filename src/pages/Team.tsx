import { useState } from "react";
import { Shield, Github, Linkedin, Twitter, Mail, Award, Users, Code, Brain } from "lucide-react";

const Team = () => {
  // Only 3 members now
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Derrick Hanns",
      role: "CEO & Group Director",
      department: "Management",
      bio: "Founder of MailInsight, driving cybersecurity innovation and advanced email threat detection systems.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      social: {
        linkedin: "https://linkedin.com",
        email: "chesire@mailinsight.com"
      }
    },
    {
      id: 2,
      name: "Iddy Chesire",
      role: "Senior Security Engineer & Security Head",
      department: "Security",
      bio: "Expert in phishing detection, AI-powered scanning, and secure system architecture.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
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
	  department:"Development",
      bio: "Designs modern, intuitive, and visually stunning user experiences for MailInsight products.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "jane@mailinsight.com"
      }
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Management", "Security", "Development"];

  const filteredMembers =
    selectedDepartment === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-orange-950 to-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Meet the CyberKnights</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              The passionate team behind MailInsight, building the future of AI-powered email security.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-gray-600 text-sm">Team Members</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">20+</p>
              <p className="text-gray-600 text-sm">Years Combined Experience</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-gray-600 text-sm">Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedDepartment === dept
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-300"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300 group"
              >
                {/* Profile Image */}
                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-orange-600 font-semibold text-sm">{member.role}</p>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mt-2">
                    {member.department}
                  </span>

                  <p className="text-gray-600 text-sm leading-relaxed my-4">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 bg-gray-100 hover:bg-gray-900 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="h-9 w-9 bg-gray-100 hover:bg-orange-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Want to Join Our Team?</h2>
            <p className="text-xl text-orange-100 mb-8">
              We're always looking for passionate cybersecurity and AI talents.
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform">
              View Open Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
