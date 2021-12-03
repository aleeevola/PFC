INSERT INTO `precio` (`id_precio`, `color`, `precio`, `tamanio_hoja`, `tipo_impresion`) VALUES
(1, 'ESCALA_DE_GRISES', 18, 'A4', 'SIMPLE'),
(2, 'ESCALA_DE_GRISES', 14, 'A4', 'DOBLE'),
(3, 'ESCALA_DE_GRISES', 22, 'A3', 'SIMPLE'),
(4, 'COLOR', 25, 'A4', 'SIMPLE'),
(5, 'COLOR', 21, 'A4', 'DOBLE');

INSERT INTO `pedido` (`id_pedido`, `cantidad_archivos`, `estado`, `fecha_entrega`, `fecha_estimada_entrega`, `fecha_ingreso`, `pago_id_pago`, `usuario_id_usuario`, `fecha_impresion`) VALUES
(1, 0, 'CREADO', NULL, NULL, '2021-10-09', NULL, NULL, NULL),
(2, 0, 'CREADO', NULL, NULL, '2021-10-10', NULL, NULL, NULL),
(3, 0, 'ENTREGADO', NULL, NULL, '2021-10-11', NULL, NULL, NULL),
(4, 0, 'ENTREGADO', NULL, NULL, '2021-10-12', NULL, NULL, NULL),
(5, 0, 'ENTREGADO', NULL, NULL, '2021-10-12', NULL, NULL, NULL),
(6, 0, 'IMPRESO', NULL, NULL, '2021-10-12', NULL, NULL, NULL),
(7, 0, 'IMPRESO', NULL, NULL, '2021-10-12', NULL, NULL, NULL),
(8, 0, 'CANCELADO', NULL, NULL, '2021-10-12', NULL, NULL, NULL);


INSERT INTO `archivo` (`id_archivo`, `fecha_baja`, `fecha_ingreso`, `nombre`, `numero_paginas`, `tamanio_hoja`, `tipo_impresion`, `token`, `pedido_id_pedido`, `precio`, `color`, `observaciones`) VALUES
(1, NULL, '2021-11-23', 'aviso_252984 (1).pdf', 2, 'A4', 'SIMPLE', '283_aviso_252984+%281%29.pdf', 2, 36, 'ESCALA_DE_GRISES', ''),
(2, NULL, '2021-11-24', 'aviso_252984 (1).pdf', 2, 'A4', 'SIMPLE', '285_aviso_252984+%281%29.pdf', 2, 36, 'ESCALA_DE_GRISES', ''),
(3, NULL, '2021-11-24', 'PlanDeProyecto-2021-Raviolo, Vola (4).pdf', 18, 'A4', 'SIMPLE', '290_PlanDeProyecto-2021-Raviolo%2C+Vola+%284%29.pdf', 2, 324, 'ESCALA_DE_GRISES', '');