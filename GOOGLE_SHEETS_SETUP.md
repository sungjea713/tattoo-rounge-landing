# Google Sheets 연동 설정 가이드

## 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 첫 번째 행에 다음 컬럼 헤더 입력:
   - `timestamp` (A열)
   - `name` (B열)
   - `phone` (C열)
   - `email` (D열)
   - `message` (E열)

## 2. Google Apps Script 설정

1. 스프레드시트 메뉴에서 `확장 프로그램` > `Apps Script` 선택
2. 기본 코드를 삭제하고 아래 코드를 붙여넣기:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 데이터를 시트에 추가
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.email,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 저장 버튼 클릭 (디스크 아이콘)
4. `배포` > `새 배포` 클릭
5. 유형 선택: `웹 앱`
6. 설정:
   - **설명**: "Contact Form Submission"
   - **다음 사용자로 실행**: 나
   - **액세스 권한**: 모든 사용자
7. `배포` 클릭
8. 권한 승인 (Google 계정 로그인 필요)
9. **웹 앱 URL** 복사 (이 URL을 `.env` 파일의 `VITE_GOOGLE_SCRIPT_URL`에 입력)

## 3. EmailJS 설정

1. [EmailJS](https://www.emailjs.com/) 회원가입
2. 이메일 서비스 추가 (Gmail 권장)
3. 이메일 템플릿 생성:

**템플릿 내용 예시:**
```
새로운 문의가 접수되었습니다.

이름: {{from_name}}
연락처: {{from_phone}}
이메일: {{from_email}}
접수 시간: {{timestamp}}

문의 내용:
{{message}}
```

4. 템플릿 변수명:
   - `from_name`
   - `from_phone`
   - `from_email`
   - `message`
   - `timestamp`

5. Dashboard에서 다음 정보 복사:
   - Service ID
   - Template ID
   - Public Key

## 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_GOOGLE_SCRIPT_URL=your_google_script_url_here
```

## 5. 테스트

1. 개발 서버 재시작: `bun run dev`
2. 폼 제출 테스트
3. Google Sheets에 데이터 저장 확인
4. 이메일 수신 확인

## 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env`가 포함되어 있는지 확인하세요
- 프로덕션 배포 시 환경 변수를 별도로 설정해야 합니다
