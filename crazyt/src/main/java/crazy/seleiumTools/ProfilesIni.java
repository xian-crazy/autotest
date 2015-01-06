package crazy.seleiumTools;

/**
 * @author xian_crazy QQ��330126160
 * @version 2014��11��5��  ����6:56:22
 * @see
 */
/*
Copyright 2007-2009 Selenium committers

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */



import com.google.common.collect.Maps;

import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.io.FileHandler;
import org.openqa.selenium.io.TemporaryFilesystem;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Map;
import static org.openqa.selenium.Platform.WINDOWS;
import static org.openqa.selenium.Platform.MAC;

public class ProfilesIni {
  private Map<String, File> profiles = Maps.newHashMap();
  private String nameOfpro = null;
  private  String pathOfpro = null;
  private File profiles_ini;

  public String getNameOfpro() {
  	return nameOfpro;
  }

  public String getPathOfpro() {
  	return pathOfpro;
  }
 

  public File getProfiles_ini() {
	return profiles_ini;
}
  
 private void getinfoOfPro(){

	    BufferedReader reader = null;
	    try {
	      reader = new BufferedReader(new FileReader(this.profiles_ini));

	      String line = reader.readLine();

	      while (line != null) {
	      
	        if (line.startsWith("Name=")) {
	          this.nameOfpro = line.substring("Name=".length());
	        } else if (line.startsWith("Path=")) {
	          this.pathOfpro = line.substring("Path=".length());
	        }

	        line = reader.readLine();
	      }
	      
	      reader.close();
	    } catch (IOException e) {
	      throw new WebDriverException(e);
	    } 

  }
  
 

public ProfilesIni() {
    File appData = locateAppDataDirectory(Platform.getCurrent());
    profiles = readProfiles(appData);
    getinfoOfPro();
  }

  protected Map<String, File> readProfiles(File appData) {
    Map<String, File> toReturn = Maps.newHashMap();

    File profilesIni = new File(appData, "profiles.ini");
    this.profiles_ini=profilesIni;
    if (!profilesIni.exists()) {
      // Fine. No profiles.ini file
      return toReturn;
    }

    boolean isRelative = true;
    String name = null;
    String path = null;

    BufferedReader reader = null;
    try {
      reader = new BufferedReader(new FileReader(profilesIni));

      String line = reader.readLine();

      while (line != null) {
        if (line.startsWith("[Profile")) {
          File profile = newProfile(name, appData, path, isRelative);
          if (profile != null)
            toReturn.put(name, profile);

          name = null;
          path = null;
        } else if (line.startsWith("Name=")) {
          name = line.substring("Name=".length());
        } else if (line.startsWith("IsRelative=")) {
          isRelative = line.endsWith("1");
        } else if (line.startsWith("Path=")) {
          path = line.substring("Path=".length());
        }

        line = reader.readLine();
      }
    } catch (IOException e) {
      throw new WebDriverException(e);
    } finally {
      try {
        if (reader != null) {
          File profile = newProfile(name, appData, path, isRelative);
          if (profile != null)
            toReturn.put(name, profile);

          reader.close();
        }
      } catch (IOException e) {
        // Nothing that can be done sensibly. Swallowing.
      }
    }

    return toReturn;
  }

  public Map<String, File> getProfiles() {
	return profiles;
}

protected File newProfile(String name, File appData, String path, boolean isRelative) {
    if (name != null && path != null) {
      File profileDir = isRelative ? new File(appData, path) : new File(path);
      return profileDir;
    }
    return null;
  }

public FirefoxProfile getDefaultProfile() {
	String profileName=this.nameOfpro;
    File profileDir = profiles.get(profileName);
    if (profileDir == null)
      return null;

    // Make a copy of the profile to use
    File tempDir = TemporaryFilesystem.getDefaultTmpFS().createTempDir("userprofile", "copy");
    try {
      FileHandler.copy(profileDir, tempDir);

      // Delete the old compreg.dat file so that our new extension is registered
      File compreg = new File(tempDir, "compreg.dat");
      if (compreg.exists()) {
        if (!compreg.delete()) {
          throw new WebDriverException("Cannot delete file from copy of profile " + profileName);
        }
      }
    } catch (IOException e) {
      throw new WebDriverException(e);
    }

    return new FirefoxProfile(tempDir);
  }

  public FirefoxProfile getProfile(String profileName) {
    File profileDir = profiles.get(profileName);
    if (profileDir == null)
      return null;

    // Make a copy of the profile to use
    File tempDir = TemporaryFilesystem.getDefaultTmpFS().createTempDir("userprofile", "copy");
    try {
      FileHandler.copy(profileDir, tempDir);

      // Delete the old compreg.dat file so that our new extension is registered
      File compreg = new File(tempDir, "compreg.dat");
      if (compreg.exists()) {
        if (!compreg.delete()) {
          throw new WebDriverException("Cannot delete file from copy of profile " + profileName);
        }
      }
    } catch (IOException e) {
      throw new WebDriverException(e);
    }

    return new FirefoxProfile(tempDir);
  }

  public File locateAppDataDirectory(Platform os) {
    File appData;
    if (os.is(WINDOWS)) {
      appData = new File(MessageFormat.format("{0}\\Mozilla\\Firefox", System.getenv("APPDATA")));

    } else if (os.is(MAC)) {
      appData =
          new File(MessageFormat.format("{0}/Library/Application Support/Firefox",
                                        System.getenv("HOME")));

    } else {
      appData = new File(MessageFormat.format("{0}/.mozilla/firefox", System.getenv("HOME")));
    }

    if (!appData.exists()) {
      // It's possible we're being run as part of an automated build.
      // Assume the user knows what they're doing
      return null;
    }

    if (!appData.isDirectory()) {
      throw new WebDriverException("The discovered user firefox data directory " +
          "(which normally contains the profiles) isn't a directory: " + appData.getAbsolutePath());
    }

    return appData;
  }
}
