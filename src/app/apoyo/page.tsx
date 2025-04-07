"use client";
import React from "react";
import Header from "../components/Header";

export default function ApoyoPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-gray-100 rounded-2xl shadow-xl p-8 max-w-2xl w-full border-2 border-[#CBAB70]">
          <h1 className="text-3xl font-bold text-center text-[#093a63] mb-6">
            ¡Gracias por usar esta página!
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            Quiero agradecerte sinceramente por utilizar esta plataforma y por
            seguir recomendándola. Este proyecto ha sido creado con mucho
            cariño. Detallé lo mejor posible cada habilidad con pocas palabras
            para que sean fáciles de entender.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Si te gusta escribir y conoces alguna historia interesante sobre
            algún campeón de{" "}
            <span className="font-semibold">League of Legends</span>, estaré
            encantado de recibir tu aporte. Solo tienes que contactarme y yo me
            encargo de agregarla con todo el crédito correspondiente.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Además, si encuentras algún error en la página o tienes alguna
            sugerencia para mejorarla, no dudes en hacérmelo saber. ¡Estoy
            abierto a todo tipo de ayuda!
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Si te gusta este proyecto y quieres apoyarlo para que siga
            creciendo, puedes hacer una pequeña donación. ¡Cualquier ayuda es
            bienvenida y muy apreciada! 🙏
          </p>

          <p className="text-gray-700 text-lg mb-4">
            El último día de cada mes estaré sorteando RP entre todas las
            personas que me hayan donado cualquier cantidad. Solamente deben
            colocar su nick en la donación.
          </p>

          <div className="mt-8 text-center">
            <p className="text-gray-700 text-lg mb-4">
              Si deseas apoyar este proyecto con una donación, puedes hacerlo
              aquí:
            </p>
            <div className="flex flex-col items-center gap-1">
              <a
                href="https://buymeacoffee.com/pantantey"
                target="_blank"
                rel="noopener noreferrer"
                className="w-64 py-2 text-center bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-500 transition duration-200"
              >
                ☕ Invítame un café
              </a>
              <p className="text-black">o</p>
              <a
                href="https://www.paypal.me/pantantey"
                target="_blank"
                rel="noopener noreferrer"
                className="w-64 py-2 text-center bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition duration-200"
              >
                💙 Donar con PayPal
              </a>
            </div>
          </div>

          <div className="mt-6 text-center max-w-xl mx-auto px-4">
            <p className="text-gray-700 text-lg mb-4">
              Si deseas apoyar este proyecto con una historia, sugerencia,
              informar un error, contar un chiste, chisme, felicitación o enviar
              un dibujito, puedes contactarme:
            </p>

            <div className="flex justify-center items-center gap-4 flex-wrap">
              <div className="text-sm text-gray-700 bg-gray px-4 py-2 rounded-full shadow">
                📬{" "}
                <span className="font-medium text-black">
                  andrey99fr@gmail.com
                </span>
              </div>

              <div className="text-sm text-gray-700 bg-gray px-4 py-2 rounded-full shadow">
                🎮 LoL:{" "}
                <span className="font-medium text-black">
                  Repartiendo Miel#LAN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
