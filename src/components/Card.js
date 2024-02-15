import React from "react";
import { useState, useEffect } from "react";
import MyEditor from "./MyEditor";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "./componentcss.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import mylogo from "./Logo2.png"
export default function Card(props) {
  const [text, setText] = useState("");
  const editorRef = useRef();
  const email = props.email;
  const docname = props.docname;
  const navigate = useNavigate();
  const islogined = localStorage.getItem("islogined") === "true";
  useEffect(() => {
    const fetchcontent = async () => {
      try {
        const ip = require("./myconstants");
        let responce = await fetch(`http://${ip}/api/getcontent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            docname: docname,
          }),
        });

        let json = await responce.json();

        setText(json.data);
      } catch (error) {
        alert(error.message);
      }
    };

    if (islogined) {
      fetchcontent();
    } else {
      var oldcontent = localStorage.getItem("content");
      if (oldcontent) {
        setText(oldcontent);
      }
    }
  }, []);

  const handleEditorChange = async (content, editor) => {
    // setText(content);
    // localStorage.setItem("user_text", content);
    try {
      const ip = require("./myconstants");
      let responce = await fetch(`http://${ip}/api/updatedoc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          docname: docname,
          content: content,
        }),
      });

      let json = await responce.json();

      setText(content);
    } catch (error) {
      alert(error.message);
    }
  };

  const downloadTxtFile = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${docname}.txt`;
    link.click();
  };

  return (
    <div
      className=""
      style={{
        height: "100%",
        backgroundColor: "#e4e4e4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {islogined ? (
        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <button onClick={downloadTxtFile}>Download as TXT</button> */}
          <div
            className="text-center pt-2 pb-2 ps-4 pe-4 text-primary fw-bold m-3"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              if (islogined) {
                navigate("/docs");
              } else {
                alert("Account not logged in");
              }
            }}
          >
            Home
          </div>
          <div
            className="text-center pt-2 pb-2 ps-4 pe-4 text-primary fw-bold m-3"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              if (islogined) {
                navigate(`/history/${email}/${docname}/${"old"}`);
              } else {
                alert("Account not logged in");
              }
            }}
          >
            History
          </div>
        </div>
      ) : null}

      <div className="text-center text-primary fw-bold fs-3 pt-4" style={{}}>
        Free Online Notepad Text Editor
      </div>

      <div
        className=" container-fluid mt-3 "
        style={{ height: "100%", backgroundColor: "#e4e4e4" }}
      >
        <div id="post" className="" style={{ backgroundColor: "#e4e4e4" }}>
          <div
            className="m-2 "
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className=""
              style={{ display: "flex", flexDirection: "column" ,alignItems:"center",width:"100%"}}
            >
              {/* Use TinyMCE Editor component with onEditorChange event */}
              <ReactQuill
                theme="snow"
                className="custom-quill-editor "
                value={text}
                onChange={(content, editor) => {
                  if (islogined) {
                    handleEditorChange(content, editor);
                  } else {
                    setText(content);
                    localStorage.setItem("content", content);
                  }
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["blockquote", "code-block"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                  "image",
                  "video",
                  "blockquote",
                  "code-block",
                  "color",
                  "background",
                  "align",
                ]}
                style={{ height: "800px", fontSize: "16px",maxWidth:"1000px",minWidth:"800px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e4e4e4",
          marginBlockStart:"50px"
        }}
      >
        <div
          className="btn bg-white text-primary fw-bold m-5"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",zIndex:3,marginBlockStart:"40px" ,}}
          onClick={downloadTxtFile}
        >
          Download as TXT
        </div>
      </div>

      <div className="accordion p-4" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header ">
            <button
              className="accordion-button fw-bold fs-5 "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              About
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              In the dynamic digital world, the need for a simple, accessible,
              and reliable text-editing tool is universal. Recognizing this, we
              present to you "OnlineNotepadEditor.com," a user-friendly online
              notepad that brings the classic notepad experience to your
              fingertips, irrespective of your operating system or device. Our
              platform is designed for individuals and professionals who seek a
              straightforward and efficient way to jot down notes, draft
              documents, or simply organize their thoughts. Whether you're a
              Windows, Mac, or Linux user, or even if you're on the go with your
              smartphone or tablet, our online notepad offers the familiar look
              and feel of traditional notepad software, but with the added
              convenience of being accessible anytime, anywhere, without any
              downloads or installations. At OnlineNotepadEditor.com, we
              understand the importance of simplicity and efficiency in text
              editing. That's why our tool mirrors the functionalities you've
              come to expect from classic notepad applications – from basic text
              editing to more advanced features. It's not just an alternative;
              it's your digital notepad, reimagined for the online world. Dive
              into a seamless writing and editing experience with
              OnlineNotepadEditor.com, where your ideas can flow uninterrupted,
              and your notes are always just a click away. No complications, no
              frills – just your thoughts, in your words, saved and accessible
              wherever you are.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed  fw-bold fs-5 "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              What is Online Notepad ?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div
              className="accordion-body"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                Online Notepad refers to a web-based application or service that
                allows users to create, edit, and save text documents directly
                in a web browser. Unlike traditional notepad applications that
                require downloading and installing software on a computer, an
                online notepad is accessible via the internet from any device
                with a web browser. This makes it a convenient tool for a wide
                range of users, especially those who work across different
                devices or need to access their notes from various locations.
              </div>

              <div className="features-container p-4">
                <h5 className="fw-bold">Key Features of an Online Notepad</h5>
                <ul>
                  <li>
                    <strong>Accessibility:</strong> Available on various
                    operating systems and devices, including PCs, laptops,
                    tablets, and smartphones.
                  </li>
                  <li>
                    <strong>No Installation Required:</strong> Since it operates
                    in a web browser, there's no need to download or install any
                    software.
                  </li>
                  <li>
                    <strong>Basic Text Editing:</strong> Provides fundamental
                    text editing features like typing, deleting, cutting,
                    copying, and pasting text.
                  </li>
                  <li>
                    <strong>Auto-Saving:</strong> Many online notepads
                    automatically save your work, preventing data loss.
                  </li>
                  <li>
                    <strong>User-Friendly Interface:</strong> Often designed to
                    be simple and intuitive, resembling the classic notepad
                    experience.
                  </li>
                  <li>
                    <strong>Sharing and Collaboration:</strong> Some online
                    notepads offer the ability to share documents with others
                    and collaborate in real time.
                  </li>
                  <li>
                    <strong>Cloud Storage:</strong> Notes can be stored in the
                    cloud, allowing users to access them from any device with
                    internet connectivity.
                  </li>
                </ul>

                <p>
                  Online notepads are particularly useful for people who need a
                  quick and easy way to write down notes, compile lists, draft
                  content, or store information temporarily without the
                  complexity of a full-featured word processor. They are also
                  beneficial for users who frequently switch between different
                  devices and need a consistent and readily accessible place to
                  store their text documents.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              What is Microsoft Notepad ?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="notepad-features-container">
                <h5>Key Characteristics and Features of Microsoft Notepad</h5>
                <ul>
                  <li>
                    <strong>Simplicity:</strong> Notepad is known for its
                    minimalist interface, offering basic functionality without
                    complex formatting options. This simplicity makes it quick
                    and easy to use for basic text editing tasks.
                  </li>
                  <li>
                    <strong>Plain Text Editing:</strong> It supports only plain
                    text; any formatting (like bold, italics, or different
                    fonts) is not possible. It's commonly used for writing raw
                    text, editing system files, or coding in simple programming
                    languages.
                  </li>
                  <li>
                    <strong>File Compatibility:</strong> Notepad can open and
                    save files with several extensions, but it primarily deals
                    with .txt files. It can also be used to view or edit other
                    file types, like HTML, by saving them with the appropriate
                    extension.
                  </li>
                  <li>
                    <strong>Encoding Options:</strong> It provides different
                    encoding options such as ANSI, UTF-8, Unicode, and Big
                    Endian Unicode, useful for different language scripts and
                    for ensuring compatibility with various systems and
                    programs.
                  </li>
                  <li>
                    <strong>Basic Features:</strong> It includes basic features
                    like search and replace, go to a specific line, and
                    word-wrap. However, it lacks advanced text editing features
                    found in more sophisticated text editors or word processors.
                  </li>
                  <li>
                    <strong>Use in Programming:</strong> While not a
                    fully-featured code editor, Notepad is often used for quick
                    edits to code or scripts because it doesn't add any
                    formatting that might disrupt the code.
                  </li>
                  <li>
                    <strong>Availability:</strong> As a component of the Windows
                    operating system, it's readily available without the need
                    for any additional downloads or installations.
                  </li>
                  <li>
                    <strong>Reliability and Stability:</strong> Notepad is known
                    for its reliability and stability, functioning effectively
                    as a basic text editor without the risk of crashes or data
                    loss common in more complex software.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Online Notepad vs Offline Notepad
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="notepad-comparison-container">
                <h5>Comparison Between Offline and Online Notepads</h5>

                <div className="offline-notepad p-4">
                  <h6>Offline Notepad (like Microsoft Notepad):</h6>
                  <ul>
                    <li>
                      <strong>Reliability:</strong> An offline notepad is always
                      accessible, regardless of your internet connection. It's a
                      dependable tool for quick notes or edits, especially when
                      you're offline.
                    </li>
                    <li>
                      <strong>Simplicity and Speed:</strong> With its
                      minimalistic design, an offline notepad offers a
                      distraction-free environment for writing and editing. It's
                      lightweight and opens quickly, making it ideal for rapid
                      note-taking.
                    </li>
                    <li>
                      <strong>Privacy and Security:</strong> Since it's a local
                      application, your data is stored on your device, providing
                      a sense of security for sensitive information.
                    </li>
                    <li>
                      <strong>No Dependency on the Internet:</strong> You can
                      use an offline notepad anytime without worrying about
                      internet connectivity issues, which is great for travel or
                      areas with unstable internet access.
                    </li>
                    <li>
                      <strong>Ease of Use:</strong> Its straightforward
                      interface is familiar to most users, requiring no learning
                      curve. This makes it a comfortable choice for many,
                      especially those who prefer traditional computing.
                    </li>
                  </ul>
                </div>

                <div className="online-notepad p-4">
                  <h6>Online Notepad:</h6>
                  <ul>
                    <li>
                      <strong>Accessibility and Convenience:</strong> An online
                      notepad can be accessed from any device with an internet
                      connection, offering unparalleled convenience for those
                      who work across multiple devices or on the go.
                    </li>
                    <li>
                      <strong>Auto-Save and Cloud Storage:</strong> Online
                      notepads often come with auto-save features and store your
                      data in the cloud, ensuring that your work is not lost and
                      can be accessed from anywhere.
                    </li>
                    <li>
                      <strong>Collaboration and Sharing:</strong> Many online
                      notepads allow for real-time collaboration and easy
                      sharing, making them ideal for teamwork and joint
                      projects.
                    </li>
                    <li>
                      <strong>Cross-Platform Compatibility:</strong> They work
                      across various operating systems and devices, which is
                      excellent for users who switch between different
                      platforms.
                    </li>
                    <li>
                      <strong>Updates and New Features:</strong> Online notepads
                      often receive regular updates and new features without the
                      need for manual software updates, keeping the tool modern
                      and efficient.
                    </li>
                  </ul>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              How to use Online Notepad Editor
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="online-notepad-editor-container">
                <h5>
                  Online Notepad Editor - Your Go-To Solution for Note-Taking
                </h5>
                <p>
                  Online Notepad Editor is a user-friendly tool that is your
                  go-to solution for quick and efficient note-taking, accessible
                  from anywhere with an internet connection. Whether you're
                  jotting down ideas, drafting documents, or just keeping track
                  of your daily tasks, our Online Notepad Editor makes it all
                  seamless and easy.
                </p>

                <h6 className="mt-4">Steps to Use Online Notepad Editor:</h6>
                <ol>
                  <li>
                    <strong>Open and Start:</strong> Simply open your web
                    browser and go to the Online Notepad Editor website. No
                    downloads, no installations – it's all ready for you right
                    there in your browser.
                  </li>
                  <li>
                    <strong>Create a New Note:</strong> Once the page loads,
                    you're greeted with a clean, blank page. This is your
                    digital notepad where you can start typing your notes or
                    ideas immediately.
                  </li>
                  <li>
                    <strong>Type Away:</strong> Begin typing whatever you want
                    to note down. The interface is straightforward, so you'll
                    feel like you're using a traditional notepad, but with the
                    perks of digital technology.
                  </li>
                  <li>
                    <strong>Use Basic Editing Features:</strong> Our Online
                    Notepad Editor includes basic text editing features. You can
                    cut, copy, paste, and delete text easily. It's all about
                    keeping things simple yet functional.
                  </li>
                  <li>
                    <strong>Save Your Work:</strong> Don’t worry about losing
                    your notes. With the auto-save feature, your work is saved
                    continuously. You can also manually save your notes if you
                    prefer.
                  </li>
                  <li>
                    <strong>Access Anytime, Anywhere:</strong> The best part?
                    You can come back to your notes anytime, from any device
                    with internet access. Your notes are always just a few
                    clicks away.
                  </li>
                  <li>
                    <strong>Share if Needed:</strong> If you want to share your
                    notes with friends or colleagues, you can easily do so. Our
                    Online Notepad Editor supports simple sharing options.
                  </li>
                </ol>

                <p>
                  Using the Online Notepad Editor is all about ease,
                  accessibility, and efficiency. It's the perfect tool for
                  everyone – students, professionals, or anyone needing a quick
                  and reliable note-taking solution. Start using it today and
                  experience the ease of managing your notes online!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fs-5 fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Why use an Online Notepad Editor
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="online-notepad-advantages-container">
                <h5>Advantages of Online Notepad Editor</h5>
                <ul>
                  <li>
                    <strong>Accessibility:</strong> You can access your notes
                    from any device with an internet connection, whether it's a
                    computer, tablet, or smartphone. This provides flexibility
                    in viewing and editing notes anytime, anywhere.
                  </li>
                  <li>
                    <strong>No Installation Required:</strong> Unlike
                    traditional software, there's no need to download or install
                    anything. You can start using it immediately, saving time
                    and device storage space.
                  </li>
                  <li>
                    <strong>Easy to Use:</strong> The Online Notepad Editor
                    typically features a user-friendly interface that is
                    intuitive to use. This makes it easy for anyone, regardless
                    of their technical expertise, to start taking notes right
                    away.
                  </li>
                  <li>
                    <strong>Auto-Save and Backup:</strong> With features like
                    auto-save and cloud-based storage, your notes are
                    automatically saved and backed up. This reduces the risk of
                    losing important information due to a device crash or
                    accidental deletion.
                  </li>
                  <li>
                    <strong>Real-Time Collaboration:</strong> Some online
                    notepad editors allow multiple users to work on the same
                    document simultaneously, making it an excellent tool for
                    collaborative work or group projects.
                  </li>
                  <li>
                    <strong>Cross-Platform Compatibility:</strong> These editors
                    work across various operating systems and browsers, ensuring
                    that your experience is consistent, regardless of the device
                    or platform you are using.
                  </li>
                  <li>
                    <strong>Security and Privacy:</strong> Many online notepads
                    offer security features to protect your information, such as
                    SSL encryption, and options to create private notes.
                  </li>
                  <li>
                    <strong>Organizational Tools:</strong> Features like the
                    ability to create multiple documents, categorize notes, and
                    search functionality help in keeping your notes organized
                    and easily retrievable.
                  </li>
                  <li>
                    <strong>Regular Updates:</strong> Since it's an online tool,
                    the notepad gets regular updates and new features without
                    the need for you to manually update the software.
                  </li>
                  <li>
                    <strong>Environmentally Friendly:</strong> By using an
                    online notepad, you're reducing the need for paper,
                    contributing to a more eco-friendly way of note-taking and
                    data storage.
                  </li>
                </ul>

                <p>
                  The Online Notepad Editor is a modern solution for note-taking
                  and document editing, combining convenience, efficiency, and
                  versatility to meet the needs of today's users.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fs-5 fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Functionalities of Free Online Notepad Editor
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="free-online-editpad-container">
                <h5>Free Online Editpad</h5>
                <p>
                  Our Editpad is an online tool that is completely free to use.
                  Enjoy the following features without any cost:
                </p>

                <ul>
                  <li>
                    <strong>No Login Required:</strong> Access our online
                    notepad without the need for any login credentials.
                  </li>
                  <li>
                    <strong>No Installation Required:</strong> Unlike many other
                    note-taking apps, our online notepad does not require any
                    installation.
                  </li>
                  <li>
                    <strong>Word & Character Count:</strong> Instantly check the
                    word and character count of your text in the online notepad.
                  </li>
                </ul>

                <p>
                  Take advantage of the simplicity and convenience of our Free
                  Online Editpad. Start jotting down your notes without any
                  barriers or costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fs-5 fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse8"
              aria-expanded="false"
              aria-controls="collapse8"
            >
              Users of Free Online Notepad
            </button>
          </h2>
          <div
            id="collapse8"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="editpad-for-users-container">
                <h5>Free Online Editpad for Various Users</h5>
                <p>
                  The Free Online Editpad caters to a diverse range of users,
                  providing a versatile platform for various needs:
                </p>

                <ul>
                  <li>
                    <strong>Students:</strong> Ideal for taking notes in both
                    online and physical classes, and for noting important points
                    during discussions.
                  </li>
                  <li>
                    <strong>Job Professionals:</strong> Perfect for jotting down
                    notes in meetings or while receiving instructions from
                    seniors.
                  </li>
                  <li>
                    <strong>Entrepreneurs:</strong> A quick solution for
                    recording ideas or creating daily to-do lists.
                  </li>
                  <li>
                    <strong>Bloggers & Writers:</strong> An accessible platform
                    for writing posts, regardless of content length.
                  </li>
                  <li>
                    <strong>Teachers:</strong> Useful for preparing lecture
                    notes and explaining concepts clearly.
                  </li>
                  <li>
                    <strong>Financial Experts:</strong> Handy for writing and
                    solving complex equations when pen and paper are not
                    available.
                  </li>
                  <li>
                    <strong>Common Man:</strong> Great for writing plain text,
                    jotting down ideas, expressing thoughts, and making task
                    lists.
                  </li>
                </ul>

                <p>
                  The Free Online Editpad is designed to be a convenient and
                  accessible tool for individuals across various roles and
                  professions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fs-5 fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse9"
              aria-expanded="false"
              aria-controls="collapse9"
            >
              FAQs
            </button>
          </h2>
          <div
            id="collapse9"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="online-notepad-faq-container">
                <h5>Online Notepad FAQs</h5>

                <div className="p-4">
                  <h6>What is an Online Notepad?</h6>

                  <p>
                    Online Notepad is a web-based text editor that allows you to
                    create, edit, and save text documents online without the
                    need for any installation or logins.
                  </p>

                  <h6>Is Online Notepad free to use?</h6>
                  <p>
                    Yes, our Online Notepad is completely free to use. There are
                    no hidden costs or subscription fees.
                  </p>

                  <h6>Do I need to create an account to use Online Notepad?</h6>
                  <p>
                    No, there is no need to create an account. You can start
                    using Online Notepad immediately without any login.
                  </p>

                  <h6>Can I access my notes from different devices?</h6>
                  <p>
                    Yes, since the notepad is online, you can access your notes
                    from any device with an internet connection.
                  </p>

                  {/* Add more questions and answers as needed */}

                  <h6>Can I adjust the font size in Online Notepad?</h6>
                  <p>
                    Yes, you can zoom in and out to change the font size for
                    better readability.
                  </p>

                  <p>
                    If you have more questions or need assistance, feel free to
                    explore the features of our Online Notepad or use the
                    'Feedback' option to share your thoughts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          
            <img
              src={mylogo}
              style={{ height: "110px" }}
            />
          
          {/* <div className="text-primary fw-bold" style={{ fontSize: "70px" }}>
            D
          </div>
          <div
            className="text-primary fw-bold mb-3"
            style={{ fontSize: "30px" }}
          >
            igitrix
          </div> */}
        </div>
        <div
          className="text-black  text-center"
          style={{ maxWidth: "600px" }}
        ></div>
        <div
          className="mt-4 footerelements"
          style={{
            
          }}
        >
          <Link to="https://onlinenotepadeditor.com/page/contact-us/">
            Contact Us
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/about-us/">
            About Us
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/privacy-policy/">
            Privacy policy
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/terms-of-service/">
            Terms
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/dmca/">
            DMCA policy
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/authors/">
            Authors
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/work-with-us/">
            Work With Us
          </Link>
          <Link to="https://onlinenotepadeditor.com/page/blog/">Blogs</Link>
          <Link to="https://onlinenotepadeditor.com/page/help/">Help</Link>
          <Link to="https://onlinenotepadeditor.com/page/frequently-asked-questions/">
            FAQs
          </Link>
        </div>
        <div className="text-black fw-bold mt-5">Find Us On</div>
        <div
          className="mt-3 mb-5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <Link to="/linkedin" style={{ color: "black" }}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </Link>
          <Link to="/facebook" style={{ color: "black" }}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </Link>
          <Link to="/instagram" style={{ color: "black" }}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
          <Link to="/twitter" style={{ color: "black" }}>
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </Link>
        </div>
      </div>
    </div>
  );
}
