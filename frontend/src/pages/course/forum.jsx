import { useEffect, useRef, useState } from 'react'
import { Send, MessageCircle, Users, Hash, Clock } from 'lucide-react'
import { courseService } from '../../api/course.service'

function Forum({ courseId }) {
  const taskRef = useRef("")
  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState([])
  const [name] = useState(localStorage.getItem("name"))
  const [course, setCourse] = useState()
  const [sending, setSending] = useState(false)

  const [formData, setFormData] = useState({
    name: name,
    course_id: courseId,
    content: ''
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [message])

  useEffect(() => {
    const fetchData = async () => {
      const msgRes = await courseService.getMessages(courseId);
      if (msgRes.success) setMessage(msgRes.data);

      const courseRes = await courseService.getCourseById(courseId);
      if (courseRes.success) setCourse(courseRes.data);
    };

    if (courseId) fetchData();
  }, [courseId]);

  const addTask = async () => {
    if (!formData.content.trim()) {
      alert("Enter a Message")
      return
    }

    setSending(true)
    const res = await courseService.addMessage({
      ...formData,
      content: formData.content.trim(),
    })
    if (res.success) {
      setMessage([...message, res.data]);      
      setFormData({ ...formData, content: "" })
      taskRef.current.value = ""
    } else {
      alert("Failed to send message")
    }
    setSending(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addTask()
    }
  }

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  }

  const getRandomColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ]
    const index = name?.length ? name.length % colors.length : 0
    return colors[index]
  }

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;

    return time.toLocaleString();
  };


  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-neutral">{course?.course_name} Discussion</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{message.filter(m => m.content.trim() !== "").length} messages</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>Active discussion</span>
          </div>
        </div>
      </div>

      <div className="h-80 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg shadow-inner">
        {message.length > 0 ? (
          message.map((value, key) => (
            value.content.trim() !== "" && (
              <div key={key} className="mb-4 p-2 bg-white rounded-lg shadow-sm">
                <div className="flex gap-3">
                  <div className={`w-8 h-8 ${getRandomColor(value.userName)} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                    {getInitials(value.userName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-neutral">{value.userName}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(value.time)}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{value.content}</p>
                  </div>
                </div>
              </div>
            )
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <div className={`w-8 h-8 ${getRandomColor(name)} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0`}>
          {getInitials(name)}
        </div>
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={taskRef}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              onKeyPress={handleKeyPress}
              rows="3"
              className="w-full p-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="Share your thoughts, ask questions, or help others..."
              disabled={sending}
            />
            <button
              onClick={addTask}
              disabled={sending || !formData.content.trim()}
              className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg disabled:shadow-none"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
            <p className="text-xs text-gray-400">
              {formData.content.length}/500
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum
