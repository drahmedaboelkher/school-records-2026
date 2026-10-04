// ============================================================
// API Client - «· Ê«’· „⁄ Google Apps Script
// ============================================================

const API = {

  // ============================================================
  // ÿ·» ⁄«„
  // ============================================================
  async request(action, params = {}) {
    try {
      const url = CONFIG.API_URL;
      
      const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // „Â„ · ›«œÌ „‘«ﬂ· CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          params: params
        })
      });

      // »”»» no-cors° „‘ Â‰ﬁœ— ‰ﬁ—√ «·—œ „»«‘—…
      // Â‰” Œœ„ ÿ—Ìﬁ… »œÌ·… (JSONP style)
      return { success: true };
      
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // ============================================================
  // ÿ·» ⁄»— GET (√”Â· ›Ì «·ﬁ—«¡…)
  // ============================================================
  async requestGet(action, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        action: action,
        ...params
      });
      
      const url = `${CONFIG.API_URL}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // ============================================================
  // ÿ·» ⁄»— JSONP (· ŒÿÌ CORS)
  // ============================================================
  requestJSONP(action, params = {}) {
    return new Promise((resolve, reject) => {
      const callbackName = 'jsonpCallback_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      
      window[callbackName] = function(data) {
        resolve(data);
        delete window[callbackName];
        document.body.removeChild(script);
      };

      const queryParams = new URLSearchParams({
        action: action,
        callback: callbackName,
        ...params
      });

      const script = document.createElement('script');
      script.src = `${CONFIG.API_URL}?${queryParams.toString()}`;
      script.onerror = function() {
        reject(new Error('JSONP request failed'));
        delete window[callbackName];
        if (script.parentNode) document.body.removeChild(script);
      };

      document.body.appendChild(script);
    });
  },

  // ============================================================
  // Ping - «Œ »«— «·« ’«·
  // ============================================================
  async ping() {
    return this.requestGet('ping');
  },

  // ============================================================
  // ============== œÊ«· «·√œ„‰ ==============
  // ============================================================

  // ≈÷«›… „œ—” ÃœÌœ
  async addTeacher(teacherName, subject, classesCount) {
    return this.requestGet('addTeacher', {
      teacherName: teacherName,
      subject: subject,
      classesCount: classesCount
    });
  },

  // Ã·» ﬂ· «·„œ—”Ì‰
  async getAllTeachers() {
    return this.requestGet('getAllTeachers');
  },

  // Õ–› „œ—”
  async deleteTeacher(code) {
    return this.requestGet('deleteTeacher', { code: code });
  },

  // ============================================================
  // ============== œÊ«· «·„œ—” ==============
  // ============================================================

  // «· Õﬁﬁ „‰ «·ﬂÊœ
  async verifyCode(code) {
    return this.requestGet('verifyCode', { code: code });
  },

  // Õ›Ÿ »Ì«‰«  «·›’·
  async saveClass(code, classNumber, classData) {
    return this.requestGet('saveClass', {
      code: code,
      classNumber: classNumber,
      className: classData.className || '',
      directorate: classData.directorate || '',
      administration: classData.administration || '',
      school: classData.school || '',
      grade: classData.grade || ''
    });
  },

  // Ã·» »Ì«‰«  «·›’·
  async getClass(code, classNumber) {
    return this.requestGet('getClass', {
      code: code,
      classNumber: classNumber
    });
  },

  // Õ›Ÿ «·ÿ·«»
  async saveStudents(code, classNumber, students) {
    // ‰»⁄  «·ÿ·«» ﬂ‹ string „›’Ê· »‹ |
    const studentsStr = students.join('|');
    return this.requestGet('saveStudents', {
      code: code,
      classNumber: classNumber,
      students: studentsStr
    });
  },

  // Ã·» «·ÿ·«»
  async getStudents(code, classNumber) {
    return this.requestGet('getStudents', {
      code: code,
      classNumber: classNumber
    });
  },

  // Õ›Ÿ «·œ—Ã« 
  async saveGrades(code, classNumber, grades) {
    const gradesStr = JSON.stringify(grades);
    return this.requestGet('saveGrades', {
      code: code,
      classNumber: classNumber,
      grades: gradesStr
    });
  },

  // Ã·» «·œ—Ã« 
  async getGrades(code, classNumber) {
    return this.requestGet('getGrades', {
      code: code,
      classNumber: classNumber
    });
  },

  // Õ›Ÿ «·€Ì«»
  async saveAttendance(code, classNumber, attendance) {
    const attStr = JSON.stringify(attendance);
    return this.requestGet('saveAttendance', {
      code: code,
      classNumber: classNumber,
      attendance: attStr
    });
  },

  // Ã·» «·€Ì«»
  async getAttendance(code, classNumber) {
    return this.requestGet('getAttendance', {
      code: code,
      classNumber: classNumber
    });
  }
};