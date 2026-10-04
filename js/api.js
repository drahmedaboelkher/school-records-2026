// ============================================================
// API Client - ÇáÊæÇÕá ãÚ Google Apps Script
// ============================================================

const API = {

  // ============================================================
  // ØáÈ ÚÇã
  // ============================================================
  async request(action, params = {}) {
    try {
      const url = CONFIG.API_URL;
      
      const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // ãåã áÊÝÇÏí ãÔÇßá CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          params: params
        })
      });

      // ÈÓÈÈ no-cors¡ ãÔ åäÞÏÑ äÞÑÃ ÇáÑÏ ãÈÇÔÑÉ
      // åäÓÊÎÏã ØÑíÞÉ ÈÏíáÉ (JSONP style)
      return { success: true };
      
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // ============================================================
  // ØáÈ ÚÈÑ GET (ÃÓåá Ýí ÇáÞÑÇÁÉ)
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
  // ØáÈ ÚÈÑ JSONP (áÊÎØí CORS)
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
  // Ping - ÇÎÊÈÇÑ ÇáÇÊÕÇá
  // ============================================================
  async ping() {
    return this.requestGet('ping');
  },

  // ============================================================
  // ============== ÏæÇá ÇáÃÏãä ==============
  // ============================================================

  // ÅÖÇÝÉ ãÏÑÓ ÌÏíÏ
  async addTeacher(teacherName, subject, classesCount) {
    return this.requestGet('addTeacher', {
      teacherName: teacherName,
      subject: subject,
      classesCount: classesCount
    });
  },

  // ÌáÈ ßá ÇáãÏÑÓíä
  async getAllTeachers() {
    return this.requestGet('getAllTeachers');
  },

  // ÍÐÝ ãÏÑÓ
  async deleteTeacher(code) {
    return this.requestGet('deleteTeacher', { code: code });
  },

  // ============================================================
  // ============== ÏæÇá ÇáãÏÑÓ ==============
  // ============================================================

  // ÇáÊÍÞÞ ãä ÇáßæÏ
  async verifyCode(code) {
    return this.requestGet('verifyCode', { code: code });
  },

  // ÍÝÙ ÈíÇäÇÊ ÇáÝÕá
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

  // ÌáÈ ÈíÇäÇÊ ÇáÝÕá
  async getClass(code, classNumber) {
    return this.requestGet('getClass', {
      code: code,
      classNumber: classNumber
    });
  },

  // ÍÝÙ ÇáØáÇÈ
  async saveStudents(code, classNumber, students) {
    // äÈÚÊ ÇáØáÇÈ ßÜ string ãÝÕæá ÈÜ |
    const studentsStr = students.join('|');
    return this.requestGet('saveStudents', {
      code: code,
      classNumber: classNumber,
      students: studentsStr
    });
  },

  // ÌáÈ ÇáØáÇÈ
  async getStudents(code, classNumber) {
    return this.requestGet('getStudents', {
      code: code,
      classNumber: classNumber
    });
  },

  // ÍÝÙ ÇáÏÑÌÇÊ
  async saveGrades(code, classNumber, grades) {
    const gradesStr = JSON.stringify(grades);
    return this.requestGet('saveGrades', {
      code: code,
      classNumber: classNumber,
      grades: gradesStr
    });
  },

  // ÌáÈ ÇáÏÑÌÇÊ
  async getGrades(code, classNumber) {
    return this.requestGet('getGrades', {
      code: code,
      classNumber: classNumber
    });
  },

  // ÍÝÙ ÇáÛíÇÈ
  async saveAttendance(code, classNumber, attendance) {
    const attStr = JSON.stringify(attendance);
    return this.requestGet('saveAttendance', {
      code: code,
      classNumber: classNumber,
      attendance: attStr
    });
  },

  // ÌáÈ ÇáÛíÇÈ
  async getAttendance(code, classNumber) {
    return this.requestGet('getAttendance', {
      code: code,
      classNumber: classNumber
    });
  }
};
