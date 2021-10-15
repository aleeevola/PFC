package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum TamanioHoja {
	A3(1),A4(2),A1(3);
	
	private final int value;
	private static Map map = new HashMap<>();

	private TamanioHoja(int value) {
	    this.value = value;
	}

	static {
	    for (TamanioHoja tamanio : TamanioHoja.values()) {
	        map.put(tamanio.value, tamanio);
	    }
	}

	public static TamanioHoja valueOf(int tamanio) {
	    return (TamanioHoja) map.get(tamanio);
	}

	public int getValue() {
	    return value;
	}
}
