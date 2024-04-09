describe('로그인 화면 테스트', () => {
  it('사용자는 아이디와 비밀번호를 사용해서 로그인한다.', () => {
    // given
    cy.visit('http://localhost:3000/auth/login');
    cy.get('[data-cy=emailInput]').as('emailInput');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    // when
    cy.get('@emailInput').type('test@naver.com');
    cy.get('@passwordInput').type('1234');

    cy.get('@emailInput').invoke('val').should('eq', 'test@naver.com');
    cy.get('@passwordInput').invoke('val').should('eq', '1234');

    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/login',
      },
      {
        code: 200,
        message: 'message',
        token: 'AUTH_TOKEN',
      },
    ).as('login');

    cy.get('[data-cy=loginButton]').should('exist').click();
    cy.url().should('include', 'http://localhost:3000/');
  });
});
