/**
 * This is a modification of the original TOTP implementation
 * from the official RFC 6238 document.
 * 
Copyright (c) 2011 IETF Trust and the persons identified as
authors of the code. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, is permitted pursuant to, and subject to the license
terms contained in, the Simplified BSD License set forth in Section
4.c of the IETF Trust's Legal Provisions Relating to IETF Documents
(http://trustee.ietf.org/license-info).
*/

import java.lang.reflect.UndeclaredThrowableException;
import java.security.GeneralSecurityException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.util.TimeZone;

/**
 * This is an example implementation of the OATH TOTP algorithm. Visit
 * www.openauthentication.org for more information.
 *
 * @author Johan Rydell, PortWise, Inc.
 */

public class TOTP {

	private TOTP() {
	}

	/**
	 * This method uses the JCE to provide the crypto algorithm. HMAC computes a
	 * Hashed Message Authentication Code with the crypto hash algorithm as a
	 * parameter.
	 *
	 * @param crypto:   the crypto algorithm (HmacSHA1, HmacSHA256, HmacSHA512)
	 * @param keyBytes: the bytes to use for the HMAC key
	 * @param text:     the message or text to be authenticated
	 */

	private static byte[] hmac_sha(String crypto, byte[] keyBytes, byte[] text) {
		try {
			Mac hmac;
			hmac = Mac.getInstance(crypto);
			SecretKeySpec macKey = new SecretKeySpec(keyBytes, "RAW");
			hmac.init(macKey);
			return hmac.doFinal(text);
		} catch (GeneralSecurityException gse) {
			throw new UndeclaredThrowableException(gse);
		}
	}

	/**
	 * This method converts a HEX string to Byte[]
	 *
	 * @param hex: the HEX string
	 *
	 * @return: a byte array
	 */

	private static byte[] hexStr2Bytes(String hex) {
		// Adding one byte to get the right conversion
		// Values starting with "0" can be converted
		byte[] bArray = new BigInteger("10" + hex, 16).toByteArray();

		// Copy all the REAL bytes, not the "first"
		byte[] ret = new byte[bArray.length - 1];
		for (int i = 0; i < ret.length; i++)
			ret[i] = bArray[i + 1];
		return ret;
	}

	/**
	 * This method generates a TOTP value for the given set of parameters.
	 *
	 * @param key:          the shared secret, HEX encoded
	 * @param time:         a value that reflects a time
	 * @param returnDigits: number of digits to return
	 *
	 * @return: a numeric String in base 10 that includes {@link truncationDigits}
	 *          digits
	 */

	public static String generateTOTP(String key, String time, String returnDigits) {
		return generateTOTP(key, time, returnDigits, "HmacSHA1");
	}

	/**
	 * This method generates a TOTP value for the given set of parameters.
	 *
	 * @param key:          the shared secret, HEX encoded
	 * @param time:         a value that reflects a time
	 * @param returnDigits: number of digits to return
	 *
	 * @return: a numeric String in base 10 that includes {@link truncationDigits}
	 *          digits
	 */

	public static String generateTOTP256(String key, String time, String returnDigits) {
		return generateTOTP(key, time, returnDigits, "HmacSHA256");
	}

	/**
	 * This method generates a TOTP value for the given set of parameters.
	 *
	 * @param key:          the shared secret, HEX encoded
	 * @param time:         a value that reflects a time
	 * @param returnDigits: number of digits to return
	 *
	 * @return: a numeric String in base 10 that includes {@link truncationDigits}
	 *          digits
	 */

	public static String generateTOTP512(String key, String time, String returnDigits) {
		return generateTOTP(key, time, returnDigits, "HmacSHA512");
	}

	/**
	 * This method generates a TOTP value for the given set of parameters.
	 *
	 * @param key:          the shared secret, HEX encoded
	 * @param time:         a value that reflects a time
	 * @param returnDigits: number of digits to return
	 * @param crypto:       the crypto function to use
	 *
	 * @return: a numeric String in base 10 that includes {@link truncationDigits}
	 *          digits
	 */

	public static String generateTOTP(String key, String time, String returnDigits, String crypto) {
		int codeDigits = Integer.decode(returnDigits).intValue();
		String result = null;

		// Using the counter
		// First 8 bytes are for the movingFactor
		// Compliant with base RFC 4226 (HOTP)
		while (time.length() < 16)
			time = "0" + time;

		// Get the HEX in a Byte[]
		byte[] msg = hexStr2Bytes(time);
		byte[] k = hexStr2Bytes(key);

		byte[] hash = hmac_sha(crypto, k, msg);

		// put selected bytes into result int
		int offset = hash[hash.length - 1] & 0xf;

		int binary = ((hash[offset] & 0x7f) << 24) | ((hash[offset + 1] & 0xff) << 16)
				| ((hash[offset + 2] & 0xff) << 8) | (hash[offset + 3] & 0xff);

		result = Long.toString(binary);
		
		//instead of getting the last 10 digits like the doc, we get the first 10
		if (result.length() > codeDigits) {
			result = result.substring(0, codeDigits - 1);
		} else {
			while (result.length() < codeDigits) {
				result = "0" + result;
			}
		}
		return result;
	}

	// convert the shared secret to hex to use in the algorithm
	private static String convertStringToHex(String str) {

		StringBuffer hex = new StringBuffer();

		// loop chars one by one
		for (char temp : str.toCharArray()) {

			// convert char to int, for char `a` decimal 97
			int decimal = (int) temp;

			// convert int to hex, for decimal 97 hex 61
			hex.append(Integer.toHexString(decimal));
		}

		return hex.toString();

	}

	public static void main(String[] args) {
		String sharedSecret = "ngantn1994@gmail.comHENNGECHALLENGE003";

		String myPrivateKey = convertStringToHex(sharedSecret);
		System.out.println(myPrivateKey);

		try {
			long T0 = 0;
			long X = 30;
			long unixTime = Instant.now().getEpochSecond();
			long T = (unixTime - T0) / X;

			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			df.setTimeZone(TimeZone.getTimeZone("JST"));

			String steps = Long.toHexString(T).toUpperCase();
			String fmtTime = String.format("%1$-11s", unixTime);
			String utcTime = df.format(new Date(unixTime * 1000));
			while (steps.length() < 16)
				steps = "0" + steps;
			System.out.print("|  " + fmtTime + "  |  " + utcTime + "  | " + steps + " | ");
			System.out.println(generateTOTP512(myPrivateKey, steps, "10"));

		} catch (final Exception e) {
			System.out.println("Error : " + e);
		}
	}
}
