import React from "react";

export default function Header() {
    return (
        <div className="header_mian">
            <div className="container">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="88" viewBox="0 0 74 88" fill="none">
                        <path
                            d="M36.9957 57.4618C36.6778 57.4628 36.3652 57.3812 36.0889 57.225L12.5222 44.0271C12.2371 43.8671 11.9999 43.6345 11.835 43.3533C11.6701 43.072 11.5834 42.7521 11.5839 42.4266V1.83446C11.5839 1.34793 11.7783 0.88133 12.1243 0.537302C12.4703 0.193273 12.9396 0 13.429 0H60.5595C61.0489 0 61.5182 0.193273 61.8642 0.537302C62.2102 0.88133 62.4046 1.34793 62.4046 1.83446V42.4266C62.4051 42.7521 62.3184 43.072 62.1535 43.3533C61.9887 43.6345 61.7514 43.8671 61.4663 44.0271L37.8996 57.225C37.6242 57.3808 37.3126 57.4624 36.9957 57.4618ZM15.274 41.3681L36.9957 53.5332L58.7145 41.3681V3.66892H15.274V41.3681Z"
                            fill="white"
                        ></path>
                        <path
                            d="M36.9957 39.0858C36.678 39.0854 36.3658 39.0038 36.0889 38.849L28.6284 34.6665C28.3433 34.5069 28.106 34.2749 27.9406 33.9942C27.7752 33.7135 27.6878 33.3941 27.6872 33.0688V25.3915H31.3773V32.0132L36.9986 35.1515L43.5552 31.4769L45.3658 34.6722L37.9053 38.8547C37.6271 39.0081 37.3138 39.0877 36.9957 39.0858Z"
                            fill="white"
                        ></path>
                        <path
                            d="M36.9957 48.2752C36.678 48.2748 36.3658 48.1933 36.0889 48.0384L20.5739 39.3482C20.2891 39.1885 20.0522 38.9563 19.8873 38.6756C19.7225 38.3949 19.6356 38.0756 19.6356 37.7506V17.8425C19.6356 17.356 19.83 16.8894 20.176 16.5453C20.522 16.2013 20.9913 16.008 21.4806 16.008H44.2668V19.6855H23.3199V36.6864L36.99 44.3438L50.6571 36.6864V28.7323H54.3472V37.7506C54.3472 38.0756 54.2603 38.3949 54.0954 38.6756C53.9306 38.9563 53.6936 39.1885 53.4089 39.3482L37.8938 48.0384C37.6196 48.192 37.3104 48.2735 36.9957 48.2752Z"
                            fill="white"
                        ></path>
                        <path
                            d="M54.3529 21.7197H50.6628V11.6744H26.1664V8.00545H52.5108C53.0001 8.00545 53.4694 8.19872 53.8154 8.54275C54.1614 8.88678 54.3558 9.35338 54.3558 9.83991L54.3529 21.7197Z"
                            fill="white"
                        ></path>
                        <path
                            d="M0 78.5624C0 73.2244 3.97991 69.1304 9.46915 69.1304C11.0224 69.1067 12.5559 69.4796 13.9228 70.2134C15.2898 70.9471 16.4446 72.0173 17.2769 73.3214L13.6872 75.4013C12.8809 74.0005 11.3199 73.1731 9.47202 73.1731C6.2439 73.1731 4.16356 75.3242 4.16356 78.5624C4.16356 81.8005 6.2439 83.9516 9.47202 83.9516C11.3199 83.9516 12.9153 83.1243 13.6872 81.7235L17.2769 83.7976C15.7159 86.3652 12.8034 87.9943 9.47202 87.9943C3.97991 87.9943 0 83.9003 0 78.5624Z"
                            fill="white"
                        ></path>
                        <path d="M53.1248 83.9174V87.9515H40.8264V69.1219H53.1248V73.156H45.1478V76.3827H52.1693V80.4681H45.1478V83.9088L53.1248 83.9174Z" fill="white"></path>
                        <path
                            d="M32.5997 81.0673C33.63 80.5632 34.5007 79.7866 35.1162 78.8229C35.7317 77.8591 36.0683 76.7453 36.0889 75.6038C36.092 74.7546 35.9262 73.9131 35.601 73.1278C35.2759 72.3425 34.7979 71.6288 34.1945 71.0278C33.591 70.4268 32.8741 69.9502 32.0848 69.6256C31.2956 69.301 30.4495 69.1346 29.5954 69.1361H22.0201V88H26.3472V81.7948H28.4075L31.9799 87.9943H36.6341L32.5997 81.0673ZM29.5954 78.0231H26.3472V73.1731H29.5954C30.7862 73.1731 31.759 74.223 31.759 75.5981C31.759 76.9733 30.7862 78.0231 29.5954 78.0231Z"
                            fill="white"
                        ></path>
                        <path
                            d="M64.8178 69.1304H57.8594V87.9315H64.8178C70.0229 87.9315 74 83.8489 74 78.531C74 73.213 70.0143 69.1304 64.8178 69.1304ZM64.8178 83.9174H62.175V73.1674H64.8063C67.7733 73.1674 69.8221 75.31 69.8221 78.5338C69.8221 81.7577 67.7848 83.9174 64.8178 83.9174Z"
                            fill="white"
                        ></path>
                    </svg>
                </span>
            </div>
        </div>
    );
}
