import { css } from "lit";

export default css`
  :host {
    position: relative;
    z-index: 0;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  p {
    display: block;
    // background-color: black;
    color: var(--c-text-color);
  }

  #map {
    width: var(--dev-mobile-width);
    height: 100vh;
    z-index: 1;
    overflow: hidden;
    position: relative;
  }

  .list-view {
    position: absolute;
    left: 2%;
    bottom: 2%;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: var(--text-m);
    z-index: 9999;
    cursor: pointer;
    text-decoration: none;
    color: var(--c-text-color);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--radius);
    transition: all 0.2s;
    border: none;
    transition: all 0.2s;
    display: none;
  }

  .refresh-button:hover,
  .list-view:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .refresh-button {
    bottom: 10%;
  }

  .place {
    text-align: left;
    font-size: 12px !important;
  
  }

  .here {
    padding: var(--space-m) var(--space-l);
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--c-text-color);
    position: relative;
    font-size: var(--text-xs);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    transform: translateY(-10px);
    cursor: default;
  }
  .here::after {
    content: "";
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 20px;
    height: 10px;
    left: 50%;
    transform: translate(-50%, 100%);
    -webkit-clip-path: polygon(100% 0, 0 0, 50% 100%);
    clip-path: polygon(100% 0, 0 0, 50% 100%);
  }

  .your-choice {
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translate(0%, -50%);
    padding: var(--textFrameY) var(--textFrameX);

    backdrop-filter: blur(10px);
    background-color: #b28136D0 !important;
    color: var(--c-text-color);
    border-radius: var(--radius);
  }

  .flex-row {
    display: flex;
  }

  .flex-row img {
    border-radius: 50%;
    border: 2px solid rgba(0,0,0,0);
  }

  .rank {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    transform: translate(30%, -30%);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }

  .name-element {
    margin-bottom: var(--space-s);
    font-size: var(--text-s) !important;
  }

  .link {
    display: inline-block;
    color: var(--c-text-color);
    text-decoration: none;
    background-color: rgb(0, 0, 0);
    margin-top: 0.3rem;
    padding: 0.3rem;
    border-radius: 1rem;
  }
  
  @media (max-width: 47em) {
    .link {
      width: 100%;
      text-align: center;
    }
  }

  .link:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .gold span {
    background-color: var(--c-gold);
    z-index: 9999999;
  }

  .silver span {
    background-color: var(--c-silver);
    color: var(--c-text-dark-color);
    z-index: 9999998;
  }

  .bronze span {
    background-color: var(--c-bronze);
    /* z-index: 97; */
    z-index: 9999997;
  }

  .gold {
    z-index: 9999999;
  }

  .silver {
    z-index: 9999998;
  }

  .bronze {
    z-index: 9999997;
  }

  .drawer {
    position: fixed;
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999999;
    transform: translate(100%);
    transition: all 0.2s;
  }

  .drawer.opened {
    transform: translate(0%);
  }

  .card {
    color: var(--c-item-text);
    border-radius: var(--radius);
    background-color: var(--c-item-background);
    padding: var(--space-xl);
    margin-bottom: var(--space-l);
  }
  .clickable {
    cursor: pointer;
    text-decoration: none;
  }

  .title {
    font-size: var(--text-l);
    font-weight: bold;
    margin-bottom: var(--space-l);
  }

  .floating-state-ui {
    position: absolute;
    width: var(--dev-mobile-width);
    height: 100vh;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    padding: var(--space-3xl) var(--space-2xl);
    gap: var(--space-l);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(7px);
  }

  .floating-state-ui > div {
    display: flex;
    flex-direction: column;
    padding: var(--space-xl);
    gap: var(--space-l);
    width: 300px;
  }
`;
