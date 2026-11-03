# ELDEN RING — 최신 HTML 사이트 파일

index.html, CSS/JS, assets 폴더가 함께 있어야 정상 동작합니다. 파일 위치와 폴더 이름을 유지하세요. 별도 빌드·설치 없이 정적 호스팅할 수 있습니다.

## GitHub Pages 게시

1. ZIP을 압축 해제합니다.
2. 압축 안의 index.html, 모든 CSS/JS, assets 폴더와 .nojekyll 파일을 저장소 최상위에 올립니다. ZIP 자체를 올리지 마세요.
3. 저장소 Settings → Pages → Source: Deploy from a branch → main → /(root) → Save.
4. 배포 후 Pages에 표시된 URL로 접속합니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

파일이 많으므로 GitHub Desktop 또는 Git으로 폴더 전체를 업로드하면 편합니다.
로컬 확인: 해당 폴더에서 python -m http.server 8000 실행 후 http://localhost:8000 접속.

## 포함된 최신 변경

- 메인 풀스크린 장면별 이동
- 어바웃 넓은 화면 폭 보정 및 제목 폰트 통일
- 오른쪽 메뉴명 전체: 회색, 불투명도 75%, 작은 크기로 상시 표시
- 느린 스크롤 및 텍스트·이미지 등장 효과
- 갤러리 배경: 2400px 분할 원본 15장 순차 연결
- 업로드된 배경음악: 기본 켜짐, 음량 12%, 반복 재생
- 배경 영상: 무음 자동 재생

브라우저가 음악 자동 재생을 차단하면 첫 클릭이나 키 입력 후 시작됩니다.
